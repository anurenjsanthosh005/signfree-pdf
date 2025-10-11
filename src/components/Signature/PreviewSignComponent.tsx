import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import {
  setIsSignText,
  setSignPreview,
  setUploadedFileSign,
  setUploadedSign,
} from "../../features/sign/signSlice";
import TransparentBg from "../../assets/transparentbg.jpg";

type PreviewSignProps = {
  onClose?: () => void;
  createSignModal?: () => void;
};

function PreviewSignComponent({ onClose, createSignModal }: PreviewSignProps) {
  const dispatch = useDispatch();
  const { uploadedFileSign } = useSelector(
    (state: RootState) => state.signSlice
  );

  const handleClose = () => {
    onClose;
    dispatch(setUploadedFileSign(null));
    dispatch(setIsSignText(false)); // force image mode
    dispatch(setSignPreview(false)); // close preview
    dispatch(setUploadedSign(null)); // clear text sign if needed
  };

  const [transparentUrl, setTransparentUrl] = useState<string | null>(null);

  if (!uploadedFileSign) return null;

  // Automatically remove white background when component mounts or file changes
  const [transparentBlob, setTransparentBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = URL.createObjectURL(uploadedFileSign);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
          data[i + 3] = 0; // alpha = 0
        }
      }

      ctx.putImageData(imgData, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        setTransparentBlob(blob);
        setTransparentUrl(URL.createObjectURL(blob));
      });
    };
  }, [uploadedFileSign]);

  const saveTransparentImage = () => {
    if (!transparentBlob) return;

    const file = new File([transparentBlob], "sign-transparent.png", {
      type: "image/png",
    });

    dispatch(setUploadedFileSign(file));
    dispatch(setIsSignText(false)); // force image mode
    dispatch(setSignPreview(false)); // close preview
    dispatch(setUploadedSign(null)); // clear text sign if needed
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg p-6 shadow-lg relative flex flex-col items-center w-[500px] gap-5">
        {/* Close Button */}
        <button
          onClick={() => handleClose()}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold mb-4">Signature Preview</h2>

        {/* Transparent Signature */}
        {transparentUrl && (
          <div className="w-full h-[200px] border relative flex items-center justify-center">
            {/* Background image */}
            <img
              src={TransparentBg}
              alt="background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Transparent sign on top */}
            <img
              src={transparentUrl}
              alt="transparent sign"
              className="max-w-full max-h-full object-contain relative z-10"
            />
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={saveTransparentImage}
          className="bg-[#FEB21A] text-white px-4 py-2 rounded hover:bg-[#ED3F27] transition mt-3"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PreviewSignComponent;
