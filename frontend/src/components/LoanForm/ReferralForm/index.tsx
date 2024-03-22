import DragDropFile from "@/components/DragDropFile";
import { DocumentType } from "@/types/file";
import { LoanRequest, ReferralDocumentRequest } from "@/types/loan";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";

type ReferralFormProps = {
  onBack: () => void;
  onSubmit: () => Promise<void>;
  uploadImage: (file: File, documentType: DocumentType) => Promise<void>;
  referralDocuments: ReferralDocumentRequest[];
  isLoading: (endpoint: string) => boolean;
  deleteFileHandler: (documentType: DocumentType) => Promise<void>;

  register: UseFormRegister<LoanRequest>;
  getValues: UseFormGetValues<LoanRequest>;
  errors: FieldErrors<LoanRequest>;
  isEditMode: boolean;
};

const EMAIL_REGREX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ReferralForm = ({
  onBack,
  onSubmit,
  referralDocuments,
  uploadImage,
  isLoading,
  deleteFileHandler,
  register,
  errors,
  isEditMode,
}: ReferralFormProps) => {
  const getDocument = (documentType: DocumentType) =>
    referralDocuments.find(
      (document) => document.documentType === documentType
    );

  return (
    <div className="relative mt-10">
      <form className="relative grid grid-cols-1 sm:grid-cols-2  gap-x-8 gap-y-3">
        <div className="form_container">
          <label className="form_label" htmlFor="firstName">
            First Name*
          </label>
          <input
            className="form_input"
            type="text"
            id="firstName"
            placeholder="First Name"
            {...register("referral.firstName", {
              required: "First Name is required",
            })}
            disabled={isEditMode}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.referral?.firstName &&
              (errors?.referral?.firstName?.message ||
                "Please enter valid input data")}
          </span>
        </div>

        <div className="form_container">
          <label className="form_label" htmlFor="lastName">
            Last Name*
          </label>
          <input
            className="form_input"
            type="text"
            id="lastName"
            placeholder="Last Name"
            {...register("referral.lastName", {
              required: "Last Name is required",
            })}
            disabled={isEditMode}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.referral?.lastName &&
              (errors?.referral.lastName?.message ||
                "Please enter valid input data")}
          </span>
        </div>

        <div className="form_container">
          <label className="form_label" htmlFor="email">
            Email
          </label>
          <input
            className="form_input"
            type="email"
            id="email"
            placeholder="Email"
            {...register("referral.email", {
              pattern: {
                value: EMAIL_REGREX,
                message: "Please enter valid email address!!",
              },
            })}
            disabled={isEditMode}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.referral?.email &&
              (errors?.referral.email?.message ||
                "Please enter valid input data")}
          </span>
        </div>

        <div className="form_container">
          <label className="form_label" htmlFor="phoneNumber">
            Phone Number*
          </label>
          <input
            className="form_input"
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            {...register("referral.phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^\+?\d[\d -]{8,12}\d$/,
                message: "Please enter a valid phone number",
              },
            })}
            disabled={isEditMode}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.referral?.phoneNumber &&
              (errors?.referral.phoneNumber?.message ||
                "Please enter valid input data")}
          </span>
        </div>
      </form>

      {/* Documents */}
      {getDocument(DocumentType.AADHAR) ||
      getDocument(DocumentType.PAN) ||
      getDocument(DocumentType.RATION_CARD) ||
      !isEditMode ? (
        <div className="mt-10">
          <p className="relative mb-8 text-[1.5rem] font-medium text-center">
            Documents
          </p>
          <div className="flex flex-col gap-y-8 w-full md:w-[80%] mx-auto">
            {(getDocument(DocumentType.AADHAR) || !isEditMode) && (
              <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 h-full flex flex-col gap-y-5">
                <label className="relative text-[1.2rem]">Aadhar</label>
                <DragDropFile
                  document={getDocument(DocumentType.AADHAR)}
                  uploadImage={uploadImage}
                  loading={isLoading(DocumentType.AADHAR)}
                  documentType={DocumentType.AADHAR}
                  deleteFileHandler={deleteFileHandler}
                  disabled={isEditMode}
                />
              </div>
            )}

            {(getDocument(DocumentType.PAN) || !isEditMode) && (
              <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 flex flex-col gap-y-5">
                <label className="relative text-[1.2rem]">Pan card</label>
                <DragDropFile
                  document={getDocument(DocumentType.PAN)}
                  uploadImage={uploadImage}
                  loading={isLoading(DocumentType.PAN)}
                  documentType={DocumentType.PAN}
                  deleteFileHandler={deleteFileHandler}
                  disabled={isEditMode}
                />
              </div>
            )}

            {(getDocument(DocumentType.RATION_CARD) || !isEditMode) && (
              <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 flex flex-col gap-y-5">
                <label className="relative text-[1.2rem]">Ration card</label>
                <DragDropFile
                  document={getDocument(DocumentType.RATION_CARD)}
                  uploadImage={uploadImage}
                  loading={isLoading(DocumentType.RATION_CARD)}
                  documentType={DocumentType.RATION_CARD}
                  deleteFileHandler={deleteFileHandler}
                  disabled={isEditMode}
                />
              </div>
            )}
          </div>

          <div className="relative col-span-1 text-center flex items-center justify-between mt-12 ">
            <button
              onClick={onBack}
              className="relative bg-orange-500 text-center px-6 py-2  rounded-md hover:bg-orange-600 mr-2"
            >
              Back
            </button>
            {!isEditMode && (
              <button
                onClick={onSubmit}
                className="relative bg-orange-500 text-center  px-6 py-2 rounded-md hover:bg-orange-600"
              >
                submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="relative flex items-center justify-center mt-6">
          No Document added!!
        </div>
      )}
    </div>
  );
};

export default ReferralForm;
