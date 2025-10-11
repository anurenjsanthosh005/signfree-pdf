import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setIsSignText,
  setSignModalValue,
} from "../../features/sign/signSlice";
import type { RootState } from "../../app/store";
import TextSign from "./Types/TextSign";
import ImageSign from "./Types/ImageSign";

type CreateSignProps = {
  onClose: () => void;
};

function CreateSign({ onClose }: CreateSignProps) {
  const { uploadedSign, uploadedFileSign } = useSelector(
    (state: RootState) => state.signSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signModalValue, isSignText } = useSelector(
    (state: RootState) => state.signSlice
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSign = (type: string) => {
    dispatch(setSignModalValue(type));
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[300px] px-4 py-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="text-lg font-bold mb-3">Create Signature</h2>

        {/* Existing Signature Preview */}
        {(uploadedSign || uploadedFileSign) && (
          <div className="max-h-40 overflow-y-auto mb-3 border border-gray-200 rounded p-1 flex justify-center">
            {isSignText ? (
              // 📝 TEXT SIGNATURE
              <div className="flex justify-between w-full">
                <div className="bg-gradient-to-r from-blue-900 w-[30%] text-white font-bold pl-2">
                  sign:
                </div>
                <div className="block w-[70%] pl-3 text-black font-bold">
                  {typeof uploadedSign === "string" ? uploadedSign : ""}
                </div>
              </div>
            ) : (
              // 🖼 IMAGE SIGNATURE
              <>
                {typeof uploadedSign === "string" ? (
                  <img
                    src={uploadedSign}
                    alt="Signature"
                    className="h-12 w-40 object-contain border"
                  />
                ) : (
                  <div className="w-full h-[200px] border relative flex items-center justify-center">
                    {/* Transparent sign on top */}
                    <img
                      src={
                        uploadedFileSign instanceof File
                          ? URL.createObjectURL(uploadedFileSign) // convert File to URL
                          : uploadedSign || undefined // string or undefined
                      }
                      alt="Signature"
                      className="h-12 w-40 object-contain border"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Add New Signature Button */}
        <div className="flex justify-between px-2">
          <button
            name="text"
            onClick={(e) => handleCreateSign(e.currentTarget.name)}
            className="px-5 bg-[#FEB21A] text-white py-1 rounded hover:bg-[#134686] transition font-bold"
          >
            Aa
          </button>

          <button
            name="camera"
            onClick={(e) => handleCreateSign(e.currentTarget.name)}
            className="px-5 bg-[#FEB21A] text-white py-1 rounded hover:bg-[#134686] transition font-semibold"
          >
            <i className="fa-solid fa-camera"></i>
          </button>

          <button
            name="draw"
            onClick={(e) => handleCreateSign(e.currentTarget.name)}
            className="px-5 bg-[#FEB21A] text-white py-1 rounded hover:bg-[#134686] transition font-semibold"
          >
            <i className="fa-solid fa-pen-nib"></i>
          </button>
        </div>

        {isModalOpen && (
          <>
            {signModalValue === "text" && (
              <TextSign
                onClose={() => handleClose()}
                createSignModal={onClose}
              />
            )}
            {signModalValue === "camera" && (
              <ImageSign
                onClose={() => handleClose()}
                createSignModal={onClose}
              />
            )}
          </>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default CreateSign;
