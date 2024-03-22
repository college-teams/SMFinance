/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepConnector, styled } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { Step, StepIconProps, StepLabel, Stepper } from "@mui/material";
import { IoMdSettings } from "react-icons/io";
import { IoDocumentAttachSharp } from "react-icons/io5";
import ReferralForm from "@/components/LoanForm/ReferralForm";
import LoanInfoForm from "@/components/LoanForm/LoanInfoForm";
import useToast from "@/hooks/useToast";
import { DocumentType } from "@/types/file";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";
import { isApiError } from "@/types/Api";
import {
  deleteFile,
  getCustomerList,
  getLoanDetailsById,
  preCloseLoan,
  saveLoan,
  updateEmiStatus,
  uploadFile,
} from "@/api";
import { useAPI } from "@/hooks/useApi";
import {
  EmiResponse,
  LoanRequest,
  LoanResponse,
  ReferralDocumentRequest,
  UpdateEMIStatus,
} from "@/types/loan";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import { Backdrop } from "./LoanList";
import { GiReceiveMoney } from "react-icons/gi";
import EmiInfoForm from "@/components/LoanForm/EmiInfoForm";

const stepsCreateMode = ["Loan Information", "Referral Information"];
const stepsEditMode = [
  "Loan Information",
  "Emi details",
  "Referral Information",
];

const SaveLoan = () => {
  const navigate = useNavigate();
  const { loanId } = useParams();
  const showToast = useToast();
  const api = useAPI();
  const [loading, startLoading, endLoading, isLoading] = useLoadingIndicator();
  const {
    register,
    reset,
    setValue,
    getValues,
    control,
    clearErrors,
    trigger,
    watch,
    formState: { errors },
  } = useForm<LoanRequest | LoanResponse>({ mode: "onChange" });

  const isEditMode = loanId != null;
  const steps = isEditMode ? stepsEditMode : stepsCreateMode;
  const [activeStep, setActiveStep] = useState(0);
  const [referralDocuments, setReferralDocuments] = useState<
    ReferralDocumentRequest[]
  >([]);
  const [customerList, setCustomerList] = useState([]);
  const [seletedCustomerName, setSeletedCustomerName] = useState<string>("");
  const [emiList, setEmiList] = useState<EmiResponse[]>([]);
  const [loanDetails, setLoanDetails] = useState<LoanResponse>();

  const uploadImage = async (
    file: File,
    documentType: DocumentType
  ): Promise<void> => {
    if (file) {
      try {
        startLoading(documentType);
        const res = await uploadFile(api, file, "referral");
        if (!isApiError(res)) {
          setReferralDocuments((pre) => [
            ...pre,
            {
              documentKey: res.fileKey,
              documentPath: res.filePath,
              documentContentType: res.fileType,
              documentType,
            },
          ]);
          showToast("File uploaded successfully", "success");
        }
      } finally {
        endLoading(documentType);
      }
    }
  };

  const deleteFileHandler = async (
    documentType: DocumentType
  ): Promise<void> => {
    const findDocument =
      referralDocuments.filter(
        (document) => document.documentType === documentType
      ) || [];

    if (findDocument.length && findDocument.length === 1) {
      try {
        startLoading("/deleteReferralFile");

        const res = await deleteFile(api, findDocument[0].documentKey);

        if (!res || !isApiError(res)) {
          const filteredDocuments =
            referralDocuments.filter(
              (document) => document.documentType !== documentType
            ) || [];
          setReferralDocuments(filteredDocuments);
          showToast("File successfully removed from the database", "success");
        }
      } finally {
        endLoading("/deleteReferralFile");
      }
    } else {
      showToast("Something went wrong", "error");
    }
  };

  const fetchCustomerList = async () => {
    startLoading("/getCustomerList");
    try {
      const res = await getCustomerList(api);
      if (!isApiError(res)) {
        const options = res.map((e) => ({
          value: e.id,
          label: e.name,
        }));
        setCustomerList(options as any);
      }
    } finally {
      endLoading("/getCustomerList");
    }
  };

  const handleNext = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const hasError = await trigger();
    if (!hasError) {
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = async () => {
    const hasError = await trigger();
    if (!hasError) {
      return;
    }

    const customerId = (getValues().customerId as any)?.value;
    const data: LoanRequest = {
      ...getValues(),
      customerId,
      referral: { ...getValues().referral, documents: referralDocuments },
    };

    startLoading("/saveLoan");
    const res = await saveLoan(api, data);

    if (!isApiError(res)) {
      showToast(`Loan details saved successfully`, "success");
      navigate("/dashboard/loans");
    }
    endLoading("/saveLoan");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const iconsCreateMode: { [index: string]: React.ReactElement } = {
      1: <IoMdSettings />,
      2: <IoDocumentAttachSharp />,
    };

    const iconsEditMode: { [index: string]: React.ReactElement } = {
      1: <IoMdSettings />,
      2: <GiReceiveMoney />,
      3: <IoDocumentAttachSharp />,
    };

    const icons: { [index: string]: React.ReactElement } = isEditMode
      ? iconsEditMode
      : iconsCreateMode;

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <LoanInfoForm
            onNext={handleNext}
            register={register}
            reset={reset}
            setValue={setValue}
            getValues={getValues}
            customerList={customerList}
            errors={errors}
            control={control}
            watch={watch}
            clearErrors={clearErrors}
            seletedCustomerName={seletedCustomerName}
            isEditMode={isEditMode}
          />
        );
      case 1:
        if (isEditMode) {
          return (
            <EmiInfoForm
              onNext={handleNext}
              onBack={handleBack}
              emis={emiList}
              updateEMI={updateEMI}
              handleLoanPreClose={handleLoanPreClose}
              loanDetails={loanDetails}
            />
          );
        } else {
          return (
            <ReferralForm
              uploadImage={uploadImage}
              isLoading={isLoading}
              onBack={handleBack}
              onSubmit={handleSubmit}
              referralDocuments={referralDocuments}
              register={register}
              getValues={getValues}
              errors={errors}
              isEditMode={isEditMode}
              deleteFileHandler={deleteFileHandler}
            />
          );
        }
      default:
        return (
          <ReferralForm
            uploadImage={uploadImage}
            isLoading={isLoading}
            onBack={handleBack}
            onSubmit={handleSubmit}
            referralDocuments={referralDocuments}
            register={register}
            getValues={getValues}
            errors={errors}
            isEditMode={isEditMode}
            deleteFileHandler={deleteFileHandler}
          />
        );
    }
  };

  const setFormValues = useCallback(
    (data: LoanResponse) => {
      Object.keys(data).forEach((key) => {
        switch (key) {
          case "customer": {
            setValue("customerId", {
              label: data.customer.name,
              value: data.customer.id,
            } as any);
            setSeletedCustomerName(data.customer.name);
            break;
          }
          default: {
            setValue(
              key as keyof LoanResponse,
              data[key as keyof LoanResponse]
            );
            break;
          }
        }
      });
      setReferralDocuments(data.referral.documents);
      setEmiList(data.emis);
    },
    [setValue]
  );

  const fetchLoanDetailsById = async (id: number) => {
    startLoading("/getLoanDetailsById");
    try {
      const res = await getLoanDetailsById(api, id);
      if (!isApiError(res)) {
        setLoanDetails(res);
        setFormValues(res);
      } else {
        navigate("/dashboard/loans");
      }
    } finally {
      endLoading("/getLoanDetailsById");
    }
  };

  const updateEMI = async (emiId: number) => {
    if (loanDetails) {
      const data: UpdateEMIStatus = {
        customerId: loanDetails.customer.id,
        status: "PAID",
      };
      startLoading("/updateEmiStatus");
      const res = await updateEmiStatus(api, Number(loanId), emiId, data);
      if (!res) {
        showToast(`Emi updated saved successfully`, "success");
        await fetchLoanDetailsById(Number(loanId));
      }
      endLoading("/updateEmiStatus");
    } else {
      showToast(`Something went wrong`, "error");
    }
  };

  const handleLoanPreClose = async () => {
    if (loanDetails) {
      startLoading("/preCloseLoan");
      const res = await preCloseLoan(api, loanDetails?.id);

      if (!res) {
        showToast(`Loan preclosed successfully`, "success");
        navigate("/dashboard/loans");
      }
      endLoading("/preCloseLoan");
    } else {
      showToast(`Something went wrong`, "error");
    }
  };

  useEffect(() => {
    if (loanId) {
      fetchLoanDetailsById(Number(loanId));
    }
  }, []);

  useEffect(() => {
    fetchCustomerList();
  }, []);

  return (
    <div className="mt-10">
      {loading && (
        <div className="absolute left-[45%] mt-[12rem] z-[1000]">
          <Backdrop />
          <Loader />
        </div>
      )}
      <>
        <div className="w-full hidden md:block">
          <Stepper
            className="relative text-white w-full"
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step className="relative text-white" key={label}>
                <StepLabel
                  className="relative text-white"
                  StepIconComponent={ColorlibStepIcon}
                >
                  <span className="relative text-white">{label}</span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <div className="relative max-w-full md:max-w-[90%] mx-auto">
          {getStepContent(activeStep)}
        </div>
      </>
    </div>
  );
};

export default SaveLoan;
