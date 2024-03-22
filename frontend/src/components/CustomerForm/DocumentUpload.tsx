import DragDropFile from "@/components/DragDropFile";
import { CustomerDocumentRequest } from "@/types/customer";
import { DocumentType } from "@/types/file";

type DocumentUploadFormProps = {
  onBack: () => void;
  onSubmit: () => Promise<void>;
  uploadImage: (file: File, documentType: DocumentType) => Promise<void>;
  customerDocuments: CustomerDocumentRequest[];
  isLoading: (endpoint: string) => boolean;
  deleteFileHandler: (documentType: DocumentType) => Promise<void>
};

const DocumentUploadForm = ({
  onBack,
  onSubmit,
  customerDocuments,
  uploadImage,
  isLoading,
  deleteFileHandler,
}: DocumentUploadFormProps) => {
  return (
    <div className="mt-10">
      <p className="relative text-2xl font-medium my-5 sm:hidden">
        Document Upload
      </p>

      <div className="flex flex-col gap-y-8 w-full md:w-[80%] mx-auto">
        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 h-full flex flex-col gap-y-5">
          <label className="relative text-[1.2rem]">Aadhar</label>
          <DragDropFile
            document={customerDocuments.find(
              (document) => document.documentType === DocumentType.AADHAR
            )}
            uploadImage={uploadImage}
            loading={isLoading(DocumentType.AADHAR)}
            documentType={DocumentType.AADHAR}
            deleteFileHandler={deleteFileHandler}
          />
        </div>

        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 flex flex-col gap-y-5">
          <label className="relative text-[1.2rem]">Pan card</label>
          <DragDropFile
            document={customerDocuments.find(
              (document) => document.documentType === DocumentType.PAN
            )}
            uploadImage={uploadImage}
            loading={isLoading(DocumentType.PAN)}
            documentType={DocumentType.PAN}
            deleteFileHandler={deleteFileHandler}
          />
        </div>

        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 flex flex-col gap-y-5">
          <label className="relative text-[1.2rem]">Ration card</label>
          <DragDropFile
            document={customerDocuments.find(
              (document) => document.documentType === DocumentType.RATION_CARD
            )}
            uploadImage={uploadImage}
            loading={isLoading(DocumentType.RATION_CARD)}
            documentType={DocumentType.RATION_CARD}
            deleteFileHandler={deleteFileHandler}
          />
        </div>
      </div>

      <div className="relative col-span-1 text-center flex items-center justify-between mt-12 ">
        <button
          onClick={onBack}
          className="relative bg-orange-500 text-center px-6 py-2  rounded-md hover:bg-orange-600 mr-2"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="relative bg-orange-500 text-center  px-6 py-2 rounded-md hover:bg-orange-600"
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
