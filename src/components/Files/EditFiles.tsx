import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import type { RootState } from "../../app/store";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface BoxPosition {
  x: number;
  y: number;
}

const EditFiles = forwardRef<HTMLDivElement>((props, ref) => {
  const { uploadedDoc, editState } = useSelector(
    (state: RootState) => state.docSlice
  );
  const { uploadedSign, uploadedFileSign, isSignText } = useSelector(
    (state: RootState) => state.signSlice
  );

  // Dynamic position & size for the RND box
  const [boxPosition, setBoxPosition] = useState<BoxPosition>({ x: 50, y: 50 });
  const [boxSize, setBoxSize] = useState({ width: 100, height: 40 });
  const [fontSize, setFontSize] = useState(24);

  const textRef = useRef<HTMLDivElement>(null);

  // Update box size based on text size
  useEffect(() => {
    if (textRef.current) {
      setBoxSize({
        width: textRef.current.offsetWidth,
        height: textRef.current.offsetHeight,
      });
    }
  }, [uploadedSign, fontSize]);

  if (!uploadedDoc) return null;

  const isPDF = uploadedDoc.type === "application/pdf";
  const isImage = uploadedDoc.type.startsWith("image/");

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      {/* PDF preview */}
      {isPDF && (
        <Document file={uploadedDoc}>
          <Page pageNumber={1} width={600} />
        </Document>
      )}

      {/* Image preview */}
      {isImage && (
        <img
          src={URL.createObjectURL(uploadedDoc)}
          alt="preview"
          style={{ maxWidth: 600 }}
        />
      )}

      {/* Signature overlay */}
      {(uploadedSign || uploadedFileSign) && (
        <Rnd
          size={{ width: boxSize.width, height: boxSize.height }}
          position={{ x: boxPosition.x, y: boxPosition.y }}
          bounds="parent"
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          onDrag={(e, d) => setBoxPosition({ x: d.x, y: d.y })}
          onResize={(e, dir, refElement, delta, position) => {
            setBoxPosition(position);

            if (isSignText && textRef.current) {
              setBoxSize({
                width: textRef.current.offsetWidth,
                height: textRef.current.offsetHeight,
              });
              setFontSize(refElement.offsetHeight * 0.8);
            } else if (!isSignText && uploadedFileSign) {
              const img = new Image();
              img.src = URL.createObjectURL(uploadedFileSign);
              img.onload = () => {
                // Maintain aspect ratio
                const ratio = img.width / img.height;
                let width = refElement.offsetWidth;
                let height = refElement.offsetHeight;

                if (width / height > ratio) {
                  width = height * ratio;
                } else {
                  height = width / ratio;
                }

                setBoxSize({ width, height });
              };
            }
          }}
          style={{
            border: editState ? "1px dashed #fff" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            paddingBottom: isSignText ? (editState ? "0px" : "70px") : "0px",
          }}
        >
          {isSignText ? (
            <div
              ref={textRef}
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: "bold",
                pointerEvents: "none",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {uploadedSign}
            </div>
          ) : (
            <img
              src={
                uploadedFileSign ? URL.createObjectURL(uploadedFileSign) : ""
              }
              alt="Signature"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          )}
        </Rnd>
      )}
    </div>
  );
});

export default EditFiles;
