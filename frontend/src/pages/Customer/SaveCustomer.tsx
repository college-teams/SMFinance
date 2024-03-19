/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepConnector, styled } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { Step, StepIconProps, StepLabel, Stepper } from "@mui/material";
import { IoMdSettings } from "react-icons/io";
import { IoDocumentAttachSharp } from "react-icons/io5";
import useToast from "@/hooks/useToast";
import { DocumentType } from "@/types/file";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";
import { isApiError } from "@/types/Api";
import {
  getCustometById,
  saveCustomer,
  updateCustomer,
  uploadFile,
} from "@/api";
import { useAPI } from "@/hooks/useApi";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import {
  CustomerDocumentRequest,
  CustomerRequest,
  CustomerResponse,
} from "@/types/customer";
import CustomerForm from "@/components/CustomerForm";
import { Backdrop } from "../Loan/LoanList";
import DocumentUploadForm from "@/components/CustomerForm/DocumentUpload";

const steps = ["Customer Information", "Documents"];

const SaveCustomer = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  const api = useAPI();
  const [loading, startLoading, endLoading, isLoading] = useLoadingIndicator();
  const {
    register,
    getValues,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<CustomerRequest | CustomerResponse>({ mode: "onChange" });

  const [activeStep, setActiveStep] = useState(0);
  const [customerDocuments, setCustomerDocuments] = useState<
    CustomerDocumentRequest[]
  >([]);

  const clearDocument = (documentType: DocumentType) => {
    const filteredDocuments =
      customerDocuments.filter(
        (document) => document.documentType !== documentType
      ) || [];
    setCustomerDocuments(filteredDocuments);

    //  TODO: call api to delete document file
  };

  const uploadImage = async (
    file: File,
    documentType: DocumentType
  ): Promise<void> => {
    if (file) {
      try {
        startLoading(documentType);
        const res = await uploadFile(api, file, "customer");
        if (!isApiError(res)) {
          setCustomerDocuments((pre) => [
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

    const data: CustomerRequest = {
      ...getValues(),
      documents: customerDocuments,
    };

    startLoading("/saveCustomer");

    let res;
    if (customerId) {
      res = await updateCustomer(api, Number(customerId), data);
    } else {
      res = await saveCustomer(api, data);
    }

    if (!isApiError(res)) {
      showToast(`Customer details saved successfully`, "success");
      navigate("/dashboard/customers");
    }
    endLoading("/saveCustomer");
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
          <CustomerForm
            onNext={handleNext}
            register={register}
            errors={errors}
          />
        );
      case 1:
        return (
          <DocumentUploadForm
            uploadImage={uploadImage}
            isLoading={isLoading}
            onBack={handleBack}
            onSubmit={handleSubmit}
            customerDocuments={customerDocuments}
            clearDocument={clearDocument}
          />
        );
      default:
        console.log("Unknown step");
        return (
          <CustomerForm
            onNext={handleNext}
            register={register}
            errors={errors}
          />
        ); // Error handling
    }
  };

  const setFormValues = useCallback(
    (data: CustomerResponse) => {
      Object.keys(data).forEach((key) => {
        setValue(
          key as keyof CustomerResponse,
          data[key as keyof CustomerResponse]
        );
      });
      setCustomerDocuments(data.documents);
    },
    [setValue]
  );

  const fetchCustomerDetailsById = async (id: number) => {
    startLoading("/getProductById");
    try {
      const res = await getCustometById(api, id);
      if (!isApiError(res)) {
        setFormValues(res);
      }
    } finally {
      endLoading("/getProductById");
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchCustomerDetailsById(Number(customerId));
    }
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

export default SaveCustomer;
