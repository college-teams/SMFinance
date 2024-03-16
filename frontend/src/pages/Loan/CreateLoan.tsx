/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { getCustomerList, saveLoan, uploadFile } from "@/api";
import { useAPI } from "@/hooks/useApi";
import { LoanRequest, ReferralDocumentRequest } from "@/types/loan";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import { Backdrop } from "./LoanList";

const steps = ["Loan Information", "Referral Information"];

const CreateLoan = () => {
  const navigate = useNavigate();
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
  } = useForm<LoanRequest>({ mode: "onChange" });

  const [activeStep, setActiveStep] = useState(0);
  const [referralDocuments, setReferralDocuments] = useState<
    ReferralDocumentRequest[]
  >([]);
  const [customerList, setCustomerList] = useState([]);

  const clearDocument = (documentType: DocumentType) => {
    const filteredDocuments =
      referralDocuments.filter(
        (document) => document.documentType !== documentType
      ) || [];
    setReferralDocuments(filteredDocuments);

    // call api to delete document file
  };

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
          showToast("Image uploaded successfully", "success");
        }
      } finally {
        endLoading(documentType);
      }
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

    const icons: { [index: string]: React.ReactElement } = {
      1: <IoMdSettings />,
      2: <IoDocumentAttachSharp />,
    };

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
          />
        );
      case 1:
        return (
          <ReferralForm
            uploadImage={uploadImage}
            isLoading={isLoading}
            onBack={handleBack}
            onSubmit={handleSubmit}
            referralDocuments={referralDocuments}
            clearDocument={clearDocument}
            register={register}
            getValues={getValues}
            errors={errors}
          />
        );
      default:
        console.log("Unknown step");
        return (
          <LoanInfoForm
            onNext={handleNext}
            register={register}
            reset={reset}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
            customerList={customerList}
            control={control}
            watch={watch}
            clearErrors={clearErrors}
          />
        ); // Error handling
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, []);

  return (
    <div className="mt-10">
      {loading ||
        (loading && (
          <div className="absolute left-[45%] mt-[12rem] z-[1000]">
            <Backdrop />
            <Loader />
          </div>
        ))}
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

export default CreateLoan;
