import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import PreviewFilesComponent from "../components/Files/PreviewFilesComponent";
import { setDownloadState } from "../features/docs/docSlice";
import CreateSign from "../components/Signature/CreateSign";

function DocEditPage() {
  const { uploadedDoc } = useSelector((state: RootState) => state.docSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!uploadedDoc) {
      navigate("/", { replace: true });
    }
  }, [uploadedDoc]);

  const handleDownload = () => {
    if (!uploadedDoc) return;

    try {
      // Create a temporary URL for the file
      const url = URL.createObjectURL(uploadedDoc);

      // Create a temporary anchor element to trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadedDoc.name;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Still reset download state if needed
      dispatch(setDownloadState(false));
    } finally {
      // Set download state to true after success
      dispatch(setDownloadState(true));
    }
  };

  return (
    <div className="relative w-full h-full bg-[#DCDCDC]">
      <div className="flex flex-col h-full">
        {/* Main Doc editing area */}
        <div className="flex-1 overflow-auto flex justify-center items-center">
          <PreviewFilesComponent showControls={false} isOverlay={false} />
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-0 left-0 w-full flex flex-col items-center py-3 shadow-md">
          <div className="flex gap-4">
            <button
              className="bg-[#FEB21A] text-black border-2 font-semibold px-6 py-2 rounded hover:bg-[#ED3F27] transition"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="fa-solid fa-file-signature"></i>
            </button>

            {/* Modal */}
            {isModalOpen && (
              <CreateSign
                onClose={() => setIsModalOpen(false)} // close modal
              />
            )}
            <button
              className="bg-[#FEB21A] text-black border-2 font-semibold px-6 py-2 rounded hover:bg-[#ED3F27] transition"
              onClick={() => navigate("/", { replace: true })}
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <button
              onClick={() => {
                handleDownload();
                navigate("/download", { replace: true });
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
