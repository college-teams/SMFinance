package com.project.smfinance.service;

import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.project.smfinance.entity.CustomerDocument;
import com.project.smfinance.entity.Emi;
import com.project.smfinance.entity.ReferralDocument;
import com.project.smfinance.repository.CustomerDocumentRepository;
import com.project.smfinance.repository.EmiRepository;
import com.project.smfinance.repository.ReferralDocumentRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
@Slf4j
@Profile("prod")
public class SchedulerService {

  private final EmiRepository emiRepository;

  private final AwsService awsService;
  private final CustomerDocumentRepository customerDocumentRepository;
  private final ReferralDocumentRepository referralDocumentRepository;

  //  This schedular will run every day at 12 AM (00:00:00)
  @Scheduled(cron = "0 0 0 * * *") // This cron expression represents 12 AM every day
  public void cleanupBucket() {
    log.info("Scheduler started for cleanup...");
    try {
      List<S3ObjectSummary> s3Objects = awsService.getBucketObjectsSummary();
      log.info("Total Objects size {}", s3Objects.size());

      for (S3ObjectSummary s3Object : s3Objects) {
        String objectKey = s3Object.getKey();
        String entity = objectKey.split("/")[0];

        switch (entity.toLowerCase()) {
          case "customer" -> handleCustomerFilesCleanup(objectKey);
          case "referral" -> handleReferralFilesCleanup(objectKey);
          default -> handleUnknownFileCleanup(objectKey);
        }
      }
    } catch (Exception e) {
      log.error("Error while accessing S3 bucket: {}", e.getMessage());
    }
  }

  /** Schedular for loan penalty calculation This schedular will run every 4 hour once */
  @Scheduled(cron = "0 0 */4 * * *") // Run every 4 hours
  public void processOverdueEMIs() {
    log.info("Scheduler started for penalty calculation...");
    LocalDate previousDay = LocalDate.now().minusDays(1); // Get previous day

    // Fetch overdue EMIs
    List<Emi> overdueEMIs =
        emiRepository.findAllByPaymentDueDateAndPaymentStatus(
            previousDay, Emi.PaymentStatus.UN_PAID);

    // Process each overdue EMI
    for (Emi emi : overdueEMIs) {
      BigDecimal penaltyAmount = emi.getLoan().getPenaltyAmount();
      emi.setPenaltyAmount(penaltyAmount);
      emi.setTotalAmount(emi.getEmiAmount().add(penaltyAmount));
      emiRepository.save(emi);
    }
  }

  private void handleCustomerFilesCleanup(String objectKey) {
    try {
      Optional<CustomerDocument> customerDocument =
          customerDocumentRepository.findByDocumentKey(objectKey);
      if (customerDocument.isEmpty()) {
        awsService.deleteFile(objectKey);
        log.info("Deleted non-linked customer file: {}", objectKey);
      }
    } catch (Exception e) {
      log.error("Error while handling customer file cleanup: {}", e.getMessage());
    }
  }

  private void handleReferralFilesCleanup(String objectKey) {
    try {
      Optional<ReferralDocument> referralDocument =
          referralDocumentRepository.findByDocumentKey(objectKey);
      if (referralDocument.isEmpty()) {
        awsService.deleteFile(objectKey);
        log.info("Deleted non-linked referral file: {}", objectKey);
      }
    } catch (Exception e) {
      log.error("Error while handling referral file cleanup: {}", e.getMessage());
    }
  }

  private void handleUnknownFileCleanup(String objectKey) {
    try {
      awsService.deleteFile(objectKey);
      log.info("Deleted unknown file: {}", objectKey);
    } catch (Exception e) {
      log.error("Error while handling unknown file cleanup: {}", e.getMessage());
    }
  }
}
