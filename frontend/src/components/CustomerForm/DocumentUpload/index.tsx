import * as React from "react";
import DragDropFile from "@/components/DragDropFile";

type DocumentUploadFormProps = {
  onBack: () => void;
  onSubmit: () => void;
};

const DocumentUploadForm = ({ onBack, onSubmit }: DocumentUploadFormProps) => {
  return (
    <div className="mt-10">
      <p className="relative text-2xl font-medium my-5 sm:hidden">
        Document Upload
      </p>

      <div className="flex flex-col gap-y-8 w-full md:w-[80%] mx-auto">
        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 h-full flex flex-col gap-y-5">
          <label className="relative text-[1.2rem]">Aadhar</label>
          <DragDropFile />
        </div>

        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 flex flex-col gap-y-5">
          <label className="relative text-[1.2rem]">Pan card</label>
          <DragDropFile />
        </div>

        <div className="relative bg-secondaryBg rounded-md px-5 pt-4 pb-8 flex flex-col gap-y-5">
          <label className="relative text-[1.2rem]">Ration card</label>
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
