import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { setDownloadState, setEditState } from "../features/docs/docSlice";
import CreateSign from "../components/Signature/CreateSign";
import EditFiles from "../components/Files/EditFiles";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function DocEditPage() {
  const { uploadedDoc } = useSelector((state: RootState) => state.docSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Redirect if no uploaded document
  useEffect(() => {
    if (!uploadedDoc) {
      navigate("/", { replace: true });
    }
  }, [uploadedDoc]);

  // Handle download of signed document
  const handleDownload = async () => {
    try {
      if (!uploadedDoc || !previewRef.current) return;

      // Hide edit UI (borders, RND)
      dispatch(setEditState(false));

      // Wait for React to re-render
      await new Promise(requestAnimationFrame);

      // Capture canvas
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Save as PDF or PNG
      if (uploadedDoc.type === "application/pdf") {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("signed.pdf");
      } else {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "signed.png";
        link.click();
      }
    } catch (error) {
      console.error("Download failed:", error);
      dispatch(setDownloadState(false));
    } finally {
      // Restore edit mode
      dispatch(setEditState(true));
      dispatch(setDownloadState(true));
    }
  };

  return (
    <div className="relative w-full h-full bg-[#DCDCDC]">
      <div className="flex flex-col h-full">
        {/* Main document editing area */}
        <div className="flex-1 overflow-auto flex justify-center items-center">
          <EditFiles ref={previewRef} />
        </div>

        {/* Bottom action bar */}
        <div className="fixed bottom-0 left-0 w-full flex flex-col items-center py-3 shadow-md">
          <div className="flex gap-4">
            {/* Open Signature Modal */}
            <button
              className="bg-[#FEB21A] text-black border-2 font-semibold px-6 py-2 rounded hover:bg-[#ED3F27] transition"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="fa-solid fa-file-signature"></i>
            </button>

            {isModalOpen && (
              <CreateSign onClose={() => setIsModalOpen(false)} />
            )}

            {/* Go back button */}
            <button
              className="bg-[#FEB21A] text-black border-2 font-semibold px-6 py-2 rounded hover:bg-[#ED3F27] transition"
              onClick={() => navigate("/", { replace: true })}
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>

            {/* Download button */}
            <button
              onClick={() => {
                handleDownload();
                // navigate("/download", { replace: true });
              }}
              className="bg-[#FEB21A] text-black border-2 font-semibold px-6 py-2 rounded hover:bg-[#6fcf6c] transition"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocEditPage;
