import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setPreviewState, setDocs } from "../../features/docs/docSlice";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import { Rnd } from "react-rnd";

pdfjs.GlobalWorkerOptions.workerSrc =
  "/node_modules/pdfjs-dist/build/pdf.worker.js";

type PreviewFilesProps = {
  showControls?: boolean;
  isOverlay?: boolean;
};

function PreviewFilesComponent({
  showControls = true,
  isOverlay = true,
}: PreviewFilesProps) {
  const dispatch = useDispatch();
  const { uploadedDoc } = useSelector((state: RootState) => state.docSlice);
  const { uploadedSign } = useSelector((state: RootState) => state.signSlice); // ✅ added
  const navigate = useNavigate();

  if (!uploadedDoc) return null;

  const isPDF = uploadedDoc.type === "application/pdf";
  const isImage = uploadedDoc.type.startsWith("image/");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(300);
  const [zoom, setZoom] = useState(0.9);

  // ✅ signature overlay state
  const [signPosition, setSignPosition] = useState({ x: 150, y: 150 });
  const [signScale, setSignScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [signSize, setSignSize] = useState({ width: 200, height: 80 });


  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.9));

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // ✅ handle drag of signature
  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setSignPosition({
      x: e.nativeEvent.offsetX - 50,
      y: e.nativeEvent.offsetY - 25,
    });
  };

  // ✅ handle scroll for scaling
  const handleWheel = (e: React.WheelEvent) => {
    if (!uploadedSign) return;
    setSignScale((prev) =>
      Math.max(0.5, Math.min(3, prev + e.deltaY * -0.001))
    );
  };

  useEffect(() => {
    function updateWidth() {
      const w = window.innerWidth;
      if (w < 400) setPageWidth(Math.min(w * 0.9, 350));
      else if (w < 768) setPageWidth(Math.min(w * 0.85, 450));
      else setPageWidth(Math.min(w * 0.7, 500));
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove} // ✅ added for drag
      onMouseUp={handleMouseUp} // ✅ added for drag stop
      onWheel={handleWheel} // ✅ added for scaling
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

          {/* ✅ Signature Overlay */}
          {uploadedSign && (
            <Rnd
              bounds="parent"
              size={{ width: signSize.width, height: signSize.height }}
              position={{ x: signPosition.x, y: signPosition.y }}
              onDragStop={(e, d) => setSignPosition({ x: d.x, y: d.y })}
              onResize={(e, direction, ref, delta, position) => {
                const newWidth = parseFloat(ref.style.width);
                const scaleRatio = newWidth / 200; // 200 is initial width baseline
                setSignSize({
                  width: newWidth,
                  height: parseFloat(ref.style.height),
                });
                setSignScale(scaleRatio);
                setSignPosition(position);
              }}
              style={{
                border: "2px dashed #3b82f6",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.15)",
                cursor: "move",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  transform: `scale(${signScale})`,
                  transformOrigin: "center",
                  transition: "transform 0.1s ease",
                }}
              >
                {typeof uploadedSign === "string" ? (
                  <p
                    className="text-black font-signature font-bold"
                    style={{
                      fontSize: "2rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {uploadedSign}
                  </p>
                ) : (
                  <img
                    src={URL.createObjectURL(uploadedSign)}
                    alt="signature"
                    style={{
                      width: "150px",
                      height: "auto",
                      transform: `scale(${signScale})`,
                      transformOrigin: "center",
                      transition: "transform 0.1s ease",
                    }}
                  />
                )}
              </div>
            </Rnd>
          )}
        </div>
      ) : (
        <div className="relative w-full flex flex-col items-center gap-6 p-4 overflow-auto">
          Loading...
        </div>
      )}

      {/* Zoom Controls */}
      {!isOverlay && (
        <div className="absolute top-9 right-9 flex items-center gap-2 rounded-xl p-2 bg-[#134686] font-bold">
          <button
            onClick={handleZoomOut}
            className="px-3 py-1 bg-[#FEB21A] text-white rounded hover:bg-slate-800"
          >
            −
          </button>
          <button
            onClick={() => setZoom(0.9)}
            className="w-[55px] py-1 bg-[#FEB21A] text-white rounded text-sm font-semibold"
          >
            {Math.round(zoom * 100) + 10}%
          </button>
          <button
            onClick={handleZoomIn}
            className="px-3 py-1 bg-[#FEB21A] text-white rounded hover:bg-slate-800"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default PreviewFilesComponent;
