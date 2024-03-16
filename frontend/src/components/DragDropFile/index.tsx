import React, { DragEvent, useRef, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { LuUpload } from "react-icons/lu";

const DragDropFile = () => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleDrag = function (e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    console.log(" handleDrag ", e.type);
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
      console.log(" handleDrop ", e.dataTransfer.files[0]);
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      console.log(" file clicked ", e.target.files[0]);
      handleFiles(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFiles = (file: File) => {
    if (
      (file.type.startsWith("image/") || file.type === "application/pdf") &&
      file.type !== ""
    ) {
      if (file.type.startsWith("image/")) {
        // Read image files
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        // For PDF files, create a data URL for the iframe src
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFilePreview(null);
    }
  };

  return (
    <form
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      className="relative "
    >
      <input
        ref={inputRef}
        type="file"
        className="relative hidden"
        onChange={handleChange}
        accept="image/*,application/pdf"
      />

      {filePreview ? (
        <div className="relative flex items-center justify-evenly gap-y-5 flex-wrap">
          <div>
            {filePreview.startsWith("data:image/") ? (
              <div className="relative h-[150px] w-[200px] overflow-hidden">
                <img
                  src={filePreview}
                  alt="File Preview"
                  className="relative object-cover h-full w-full min-w-full"
                  width={150}
                  height={100}
                />
              </div>
            ) : filePreview.startsWith("data:application/pdf") ? (
              <div className="relative  max-w-[200px]"> 
                <iframe
                  title="PDF Preview"
                  src={filePreview}
                  className="relative max-w-full"
                />
              </div>
            ) : null}
          </div>
          <div className="flex gap-x-3">
            <button className="relative px-5 py-2 bg-addBtnBg capitalize rounded-md  flex items-center justify-between gap-x-2">
              <LuUpload />
              <span>upload</span>
            </button>
            <button
              onClick={() => setFilePreview(null)}
              className="relative px-5 py-2 bg-red-400 capitalize rounded-md flex items-center justify-between gap-x-2"
            >
              <MdDeleteOutline size={20} /> <span>Delete</span>
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="input-file-upload"
          className={`${
            dragActive && " bg-primaryBg"
          } h-full flex items-center justify-center border-[2px] px-7 py-12 rounded-md border-dashed cursor-pointer`}
          onClick={onButtonClick}
        >
          <div className="relative text-center flex gap-5 flex-wrap justify-center">
            <div>
              <BsCloudUpload size={30} />
            </div>
            <div className="relative ">
              <div className="flex items-center gap-x-2">
                <p>
                  Drag and drop your file here or
                  <span className="text-center  cursor-pointer  text-[1rem] border-none bg-transparent  ml-2 text-blue-500">
                    Upload a file
                  </span>
                </p>
              </div>

              <div className="relative text-lightWhite text-[12px] pt-2">
                Only images or pdf files accepted
              </div>
            </div>
          </div>
        </label>
      )}

      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

export default DragDropFile;
