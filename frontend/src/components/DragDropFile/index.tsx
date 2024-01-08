"use client";

import Image from "next/image";
import React, { DragEvent, useRef, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";

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
        <div className="relative flex items-center justify-evenly gap-10 flex-wrap">
          <>
            {filePreview.startsWith("data:image/") ? (
              <div className="">
                <Image
                  src={filePreview}
                  alt="File Preview"
                  className="relative object-contain"
                  width={150}
                  height={100}
                />
              </div>
            ) : filePreview.startsWith("data:application/pdf") ? (
              <iframe title="PDF Preview" src={filePreview} />
            ) : null}
          </>
          <div className="flex gap-x-3">
            <button className="relative px-5 py-2 bg-addBtnBg capitalize rounded-md">
              upload
            </button>
            <button
              onClick={() => setFilePreview(null)}
              className="relative px-5 py-2 bg-red-400 capitalize rounded-md"
            >
              <MdDeleteOutline size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="input-file-upload"
          className={`${
            dragActive && " bg-primaryBg"
          } h-full flex items-center justify-center border-[2px] px-7 py-10 rounded-md border-dashed`}
        >
          <div className="relative text-center flex gap-5">
            <div>
              <BsCloudUpload size={30} />
            </div>
            <div>
              <p>Drag and drop your file here or</p>
              <button
                className="text-center  cursor-pointer p-[0.25rem] text-[1rem] border-none bg-transparent underline text-blue-500"
                onClick={onButtonClick}
              >
                Upload a file
              </button>

              <div className="relative text-lightWhite text-sm pt-5">only images or pdf accepted</div>
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
