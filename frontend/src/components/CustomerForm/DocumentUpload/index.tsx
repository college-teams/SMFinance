import * as React from "react";
import { SelectScrollable } from "../../select";
import DragDropFile from "@/components/DragDropFile";

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

      <div className="flex flex-col gap-6 w-[80%] mx-auto">
        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 h-full flex flex-col gap-4">
          <label htmlFor="">Aadhar</label>
          <DragDropFile />
        </div>

        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 flex flex-col gap-4">
          <label htmlFor="">Pan card</label>
          <DragDropFile />
        </div>

        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 flex flex-col gap-4">
          <label htmlFor="">Ration card</label>
          <DragDropFile />
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
