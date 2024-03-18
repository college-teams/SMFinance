import React, { DragEvent, useRef, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import { Document, DocumentType } from "@/types/file";
import Loader from "../Loader";
import NoImage from "/images/noImage.png";
import ImageWithFallback from "@/utils/ImageWithFallback";
import IframeWithFallback from "@/utils/IframeWithFallback";
import useToast from "@/hooks/useToast";

type DragDropFileProps = {
  document: Document | undefined;
  uploadImage: (file: File, documentType: DocumentType) => Promise<void>;
  loading: boolean;
  documentType: DocumentType;
  clearDocument: (documentType: DocumentType) => void;
};

const DragDropFile = ({
  document,
  uploadImage,
  documentType,
  loading,
  clearDocument,
}: DragDropFileProps) => {
  const showToast = useToast();

  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isValidFileType = (file: File): boolean => {
    if (
      !(file.type.startsWith("image/") || file.type === "application/pdf") &&
      file.type !== ""
    ) {
      showToast("Only images or PDF files are accepted.", "error");
      return false;
    }

    return true;
  };

  const handleDrag = function (e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

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
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      isValidFileType(e.dataTransfer.files[0])
    ) {
      uploadImage(e.dataTransfer.files[0], documentType);
    }
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (
      e.target.files &&
      e.target.files[0] &&
      isValidFileType(e.target.files[0])
    ) {
      uploadImage(e.target.files[0], documentType);
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const deleteFile = () => {
    clearDocument(documentType);
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

      {loading ? (
        <div className="relative flex items-center justify-center">
          <Loader />
        </div>
      ) : document ? (
        <div className="relative flex items-center justify-evenly gap-y-5 flex-wrap">
          <div>
            {document.documentContentType.startsWith("image/") ? (
              <div className="relative h-[150px] w-[200px] overflow-hidden">
                <ImageWithFallback
                  imagePath={document.documentPath}
                  alt="File Preview"
                  className="relative object-cover h-full w-full min-w-full"
                  defaultImage={NoImage}
                />
              </div>
            ) : document.documentContentType.startsWith(
                "application/pdf"
              ) ? (
              <div className="relative  max-w-[200px]">
                <IframeWithFallback
                  iframeSrc={document.documentPath}
                  defaultSrc={NoImage}
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
              onClick={deleteFile}
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
