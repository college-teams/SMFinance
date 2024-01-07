import * as React from "react";
import { SelectScrollable } from "../select";

type DocumentUploadFormProps = {
  onBack: () => void;
  onNext: () => void;
};

const DocumentUploadForm = ({ onBack, onNext }: DocumentUploadFormProps) => {
  return (
    <div className="mt-10">
      <p className="relative text-2xl font-medium my-5 sm:hidden">
        Document Upload
      </p>
      <SelectScrollable />
      <div className="relative col-span-1 text-center flex items-center justify-between mt-12">
        <button
          onClick={onBack}
          className="relative bg-orange-500 text-center px-6 py-2  rounded-md hover:bg-orange-600 mr-2"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="relative bg-orange-500 text-center  px-6 py-2 rounded-md hover:bg-orange-600"
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
