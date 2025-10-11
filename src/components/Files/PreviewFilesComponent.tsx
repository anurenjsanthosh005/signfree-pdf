import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setPreviewState, setDocs } from "../../features/docs/docSlice";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";

type PreviewFilesProps = {
  showControls?: boolean;
  isOverlay?: boolean;
};

function PreviewFilesComponent({
  showControls = true,
  isOverlay = true,
}: PreviewFilesProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadedDoc } = useSelector((state: RootState) => state.docSlice);

  if (!uploadedDoc) return null;

  const isPDF = uploadedDoc.type === "application/pdf";
  const isImage = uploadedDoc.type.startsWith("image/");

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(300);
  const [zoom, setZoom] = useState(0.9);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div
      className={`${
        isOverlay
          ? "fixed inset-0 z-50 p-6 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center overflow-auto"
          : "relative flex flex-col items-center bg-black/20 backdrop-blur-sm"
      }`}
    >
      {/* Header Buttons */}
      {showControls && (
        <div className="w-full max-w-4xl flex justify-between items-center mb-4 absolute top-0 p-6">
          <button
            className="bg-[#FEB21A] text-white border-2 font-semibold px-4 py-2 rounded hover:bg-[#ED3F27] transition"
            onClick={() => {
              dispatch(setPreviewState(false));
              dispatch(setDocs(null));
            }}
          >
            Change File
          </button>

          <button
            className="bg-[#FEB21A] text-white border-2 font-semibold px-4 py-2 rounded hover:bg-[#6fcf6c] transition"
            onClick={() => {
              dispatch(setPreviewState(false));
              navigate("/edit", { replace: true });
            }}
          >
            Confirm
          </button>
        </div>
      )}

      {/* File Name */}
      <div
        className={`${
          isOverlay
            ? "inline-block w-full font-bold text-white px-2 mb-3 absolute top-17"
            : "inline-block w-full pl-5 font-bold text-white px-2 mb-3 bg-gradient-to-b from-slate-500 to-transparent pt-2"
        }`}
      >
        {uploadedDoc?.name}
      </div>

      {/* Main Preview Area */}
      {isPDF || isImage ? (
        <div
          className="relative w-[400px] md:w-[500px] lg:w-[600px] flex flex-col items-center gap-6 p-4 overflow-auto"
          style={{ maxHeight: "80vh" }}
        >
          {isPDF && (
            <Document file={uploadedDoc} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from({ length: numPages ?? 1 }, (_, index) => (
                <div key={index} className="flex justify-center mb-6">
                  <Page
                    pageNumber={index + 1}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    scale={zoom}
                  />
                </div>
              ))}
            </Document>
          )}

          {isImage && (
            <img
              src={URL.createObjectURL(uploadedDoc)}
              alt={uploadedDoc.name}
              className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] max-h-[80vh] object-contain bg-white rounded-xl shadow"
              style={{
                transform: `scale(${zoom})`,
                transition: "transform 0.2s ease",
              }}
            />
          )}
        </div>
      ) : (
        <div className="relative w-full flex flex-col items-center gap-6 p-4 overflow-auto">
          Loading...
        </div>
      )}
    </div>
  );
}

export default PreviewFilesComponent;
