import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepConnector, styled } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { Step, StepIconProps, StepLabel, Stepper } from "@mui/material";
import { IoMdSettings } from "react-icons/io";
import { IoDocumentAttachSharp } from "react-icons/io5";
import DocumentUploadForm from "@/components/LoanForm/DocumentUpload";
import LoanInfoForm from "@/components/LoanForm/LoanInfoForm";

const steps = ["Loan Information", "Referral Information"];

const CreateLoan = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = () => {
    console.log("Loan form submitted");
    navigate("/dashboard/loans");
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
        return <LoanInfoForm onNext={handleNext} />;
      case 1:
        return (
          <DocumentUploadForm onBack={handleBack} onSubmit={handleSubmit} />
        );
      default:
        console.log("Unknown step");
        return <LoanInfoForm onNext={handleNext} />; // Error handling
    }
  };

  return (
    <div className="mt-10">
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
    </div>
  );
};

export default CreateLoan;
