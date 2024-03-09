package com.project.smfinance.service;

import static com.project.smfinance.codes.ErrorCodes.EMI_ALREADY_PAID;
import static com.project.smfinance.codes.ErrorCodes.EMI_NOT_FOUND;
import static com.project.smfinance.codes.ErrorCodes.LOAN_ALREADY_PRE_CLOSED;
import static com.project.smfinance.codes.ErrorCodes.LOAN_NOT_FOUND;
import static com.project.smfinance.codes.SuccessCodes.*;

import com.project.smfinance.entity.Customer;
import com.project.smfinance.entity.Emi;
import com.project.smfinance.entity.Loan;
import com.project.smfinance.entity.Referral;
import com.project.smfinance.entity.ReferralDocument;
import com.project.smfinance.entity.Transaction;
import com.project.smfinance.exception.BaseException;
import com.project.smfinance.models.loan.EmiUpdateRequest;
import com.project.smfinance.models.loan.LoanRequest;
import com.project.smfinance.models.loan.LoanResponse;
import com.project.smfinance.models.referral.ReferralDocumentRequest;
import com.project.smfinance.models.referral.ReferralRequest;
import com.project.smfinance.models.response.AbstractResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.repository.EmiRepository;
import com.project.smfinance.repository.LoanRepository;
import com.project.smfinance.repository.ReferralDocumentRepository;
import com.project.smfinance.repository.ReferralRepository;
import com.project.smfinance.repository.TranscationRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class LoanService {

  private final LoanRepository loanRepository;
  private final EmiRepository emiRepository;
  private final CustomerService customerService;
  private final ReferralRepository referralRepository;
  private final ReferralDocumentRepository referralDocumentRepository;
  private final TranscationRepository transcationRepository;

  private static final int DAILY_EMI_LIMIT = 100;
  private static final int WEEKLY_EMI_LIMIT = 15;

  public ApiResponse<List<LoanResponse>> getAllLoans() {
    List<Loan> loans = loanRepository.findAll();

    List<LoanResponse> loanList = LoanResponse.from(loans);
    return new ApiResponse<>(LOAN_LIST_FETCHED, AbstractResponse.StatusType.SUCCESS, loanList);
  }

  public ApiResponse<LoanResponse> getLoanDetails(Long loanId) throws BaseException {
    Loan loan = getLoanById(loanId);

    LoanResponse loanResponse = LoanResponse.from(loan);
    return new ApiResponse<>(LOAN_DATA_FETCHED, AbstractResponse.StatusType.SUCCESS, loanResponse);
  }

  @Transactional
  public ApiResponse<LoanResponse> createLoanAndGenerateEMIs(LoanRequest loanRequest)
      throws BaseException {
    Referral saveReferral = saveReferralInformation(loanRequest.getReferral());

    List<ReferralDocument> referralDocuments =
        saveReferralDocuments(loanRequest.getReferral().getReferralDocuments(), saveReferral);
    saveReferral.setReferralDocuments(referralDocuments);

    Customer customer = customerService.getCustomerById(loanRequest.getCustomerId());
    Loan loan = LoanRequest.from(loanRequest, customer, saveReferral);

    Loan savedLoan = loanRepository.save(loan);

    generateEMIs(loanRequest, savedLoan);

    LoanResponse loanResponse = LoanResponse.from(getLoanById(savedLoan.getId()));
    return new ApiResponse<>(LOAN_CREATED, AbstractResponse.StatusType.SUCCESS, loanResponse);
  }

  @Transactional
  public ApiResponse updateEMI(EmiUpdateRequest emiUpdateRequest, long loanId, long emiId)
      throws BaseException {
    Loan loan = getLoanById(loanId);
    Emi emi = getEmiByIdAndLoanId(emiId, loanId);
    if (emi.getPaymentStatus().equals(Emi.PaymentStatus.PAID)) {
      throw new BaseException(EMI_ALREADY_PAID);
    }

    emi.setPaymentStatus(emiUpdateRequest.getStatus());

    saveTransaction(emi);

    List<Emi> allPendingEMIs = emiRepository.getAllPendingEMIs(loan);
    if (allPendingEMIs.isEmpty()) {
      loan.setLoanStatus(Loan.LoanStatus.CLOSED);
      loan.setCloseData(LocalDate.now());
      calculateTotalAmountPaid(loan);
    }

    emiRepository.save(emi);
    loanRepository.save(loan);
    return new ApiResponse<>(EMI_UPDATED, AbstractResponse.StatusType.SUCCESS);
  }

  @Transactional
  public ApiResponse preCloseLoan(long loanId) throws BaseException {
    Loan loan = getLoanById(loanId);
    if (loan.getLoanStatus().equals(Loan.LoanStatus.PRE_CLOSED)) {
      throw new BaseException(LOAN_ALREADY_PRE_CLOSED);
    }
    // Retrieve all pending EMIs associated with the loan
    List<Emi> pendingEMIs = emiRepository.getAllPendingEMIs(loan);

    if (!pendingEMIs.isEmpty()) {
      Emi firstUnpaidEmi = null;
      BigDecimal totalAmountPaid = BigDecimal.ZERO;

      // Calculate the total amount paid as the sum of pending EMIs
      for (Emi emi : pendingEMIs) {
        totalAmountPaid = totalAmountPaid.add(emi.getTotalAmount());
        // If this is the first unpaid EMI, mark it and continue
        if (firstUnpaidEmi == null) {
          firstUnpaidEmi = emi;
          continue;
        }

        // Delete all other pending EMIs
        emiRepository.delete(emi);
      }

      // Update the total amount paid in the loan entity
      loan.setTotalAmountPaid(totalAmountPaid);

      // Update first unpaid EMI
      firstUnpaidEmi.setTotalAmount(totalAmountPaid);
      firstUnpaidEmi.setPaymentStatus(Emi.PaymentStatus.PAID);
      firstUnpaidEmi.setEmiAmount(totalAmountPaid.subtract(firstUnpaidEmi.getPenaltyAmount()));

      // Update the transaction details
      saveTransaction(firstUnpaidEmi);

      // Save the updated loan and EMI entities
      emiRepository.save(firstUnpaidEmi);
    }

    loan.setLoanStatus(Loan.LoanStatus.PRE_CLOSED);
    loan.setCloseData(LocalDate.now());
    calculateTotalAmountPaid(loan);
    loanRepository.save(loan);
    return new ApiResponse<>(LOAN_UPDATED, AbstractResponse.StatusType.SUCCESS);
  }

  //  private methods
  private void generateEMIs(LoanRequest loanRequest, Loan loan) {
    List<Emi> EMIs = new ArrayList<>();

    switch (loanRequest.getLoanCategory()) {
      case DAILY -> generateEMIsForCategory(
          loanRequest, loan, DAILY_EMI_LIMIT, ChronoUnit.DAYS, EMIs);
      case WEEKLY -> generateEMIsForCategory(
          loanRequest, loan, WEEKLY_EMI_LIMIT, ChronoUnit.WEEKS, EMIs);
      case MONTHLY -> generateEMIsForCategory(
          loanRequest, loan, loanRequest.getCustomerPreference(), ChronoUnit.MONTHS, EMIs);
      case TIME_TO_TIME -> generateSingleEMI(loanRequest, loan, EMIs);
      default -> {}
        // Handle other cases TODO: do we need to throw an error ?
    }

    // Save all EMIs in bulk
    emiRepository.saveAll(EMIs);
  }

  private void generateEMIsForCategory(
      LoanRequest loanRequest,
      Loan loan,
      int numberOfEMIs,
      TemporalUnit temporalUnit,
      List<Emi> EMIs) {
    BigDecimal totalLoanAmount = loanRequest.getLoanAmount();
    BigDecimal emiAmount =
        totalLoanAmount.divide(BigDecimal.valueOf(numberOfEMIs), 2, RoundingMode.HALF_UP);
    BigDecimal remainingAmount =
        totalLoanAmount.subtract(emiAmount.multiply(BigDecimal.valueOf(numberOfEMIs)));

    LocalDate currentDate = loanRequest.getStartDate();

    for (int i = 1; i <= numberOfEMIs; i++) {
      if (i == numberOfEMIs) {
        emiAmount = emiAmount.add(remainingAmount);
      }

      Emi emi = createEmi(loan, emiAmount, currentDate);
      EMIs.add(emi);

      currentDate = currentDate.plus(1, temporalUnit);
    }

    //    updating maturity data
    loan.setMaturityDate(currentDate.minus(1, temporalUnit));
    loanRepository.save(loan);
  }

  private void generateSingleEMI(LoanRequest loanRequest, Loan loan, List<Emi> EMIs) {
    BigDecimal loanAmount = loanRequest.getLoanAmount();
    Emi emi =
        createEmi(
            loan,
            loanAmount,
            loanRequest.getStartDate().plusDays(loanRequest.getCustomerPreference()));
    EMIs.add(emi);

    //    updating maturity data
    loan.setMaturityDate(loanRequest.getStartDate().plusDays(loanRequest.getCustomerPreference()));
    loanRepository.save(loan);
  }

  private Emi createEmi(Loan loan, BigDecimal emiAmount, LocalDate dueDate) {
    Emi emi = new Emi();
    emi.setLoan(loan);
    emi.setEmiAmount(emiAmount);
    emi.setPaymentDueDate(dueDate);
    emi.setPaymentStatus(Emi.PaymentStatus.UN_PAID);
    emi.setPenaltyAmount(BigDecimal.ZERO);
    emi.setTotalAmount(
        emiAmount); // Setting emi amount to total amount because initially penalty will be 0
    return emi;
  }

  private Referral saveReferralInformation(ReferralRequest referralRequest) {
    Referral referral = ReferralRequest.from(referralRequest);
    return referralRepository.save(referral);
  }

  private List<ReferralDocument> saveReferralDocuments(
      List<ReferralDocumentRequest> referralDocuments, Referral referral) {
    List<ReferralDocument> referralDocumentsList = new ArrayList<>();
    for (ReferralDocumentRequest referralDocumentRequest : referralDocuments) {
      ReferralDocument referralDocument =
          ReferralDocumentRequest.from(referralDocumentRequest, referral);
      ReferralDocument savedReferralDocument = referralDocumentRepository.save(referralDocument);
      referralDocumentsList.add(savedReferralDocument);
    }
    return referralDocumentsList;
  }

  public Loan getLoanById(Long id) throws BaseException {
    Optional<Loan> loan = loanRepository.findById(id);

    if (loan.isEmpty()) {
      throw new BaseException(LOAN_NOT_FOUND);
    }

    return loan.get();
  }

  private Emi getEmiById(long emiId) throws BaseException {
    Optional<Emi> emiById = emiRepository.findById(emiId);
    if (emiById.isEmpty()) {
      throw new BaseException(EMI_NOT_FOUND);
    }
    return emiById.get();
  }

  private Emi getEmiByIdAndLoanId(long emiId, long loanId) throws BaseException {
    Optional<Emi> emiByIdAndLoanId = emiRepository.findByIdAndLoanId(emiId, loanId);
    if (emiByIdAndLoanId.isEmpty()) {
      throw new BaseException(EMI_NOT_FOUND);
    }
    return emiByIdAndLoanId.get();
  }

  private void saveTransaction(Emi emi) {
    Transaction transaction = new Transaction(emi, emi.getTotalAmount(), LocalDateTime.now());
    transcationRepository.save(transaction);
  }

  private void calculateTotalAmountPaid(Loan loan) {
    List<Emi> allEMIs = emiRepository.findAllByLoan(loan);
    BigDecimal totalAmountPaid =
        allEMIs.stream().map(Emi::getTotalAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
    loan.setTotalAmountPaid(totalAmountPaid);
  }
}
