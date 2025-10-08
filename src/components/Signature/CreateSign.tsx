import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setIsSignText,
  setSignModalValue,
} from "../../features/sign/signSlice";
import type { RootState } from "../../app/store";
import TextSign from "./Types/TextSign";

type Signature = {
  id: number;
  name: string;
};

type CreateSignProps = {
  onClose: () => void;
};

function CreateSign({ onClose }: CreateSignProps) {
  const { uploadedSign } = useSelector((state: RootState) => state.signSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signModalValue, isSignText } = useSelector(
    (state: RootState) => state.signSlice
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  //   useEffect(() => {
  //     console.log("isSignText :",isSignText);

  //   }, [isSignText]);

  const handleCreateSign = (type: string) => {
    switch (type) {
      case "text":
        console.log("Text signature selected");
        dispatch(setSignModalValue(type));
        setIsModalOpen(true);
        break;
      case "camera":
        console.log("Camera signature selected");
        break;
      case "draw":
        console.log("Draw signature selected");
        break;
      default:
        break;
    }

    // navigate("/add-sign");
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
        {/* Existing Signature */}
        {uploadedSign && (
          <div className="max-h-40 overflow-y-auto mb-3 border border-gray-200 rounded p-1 flex justify-center">
            {isSignText ? (
              <div className="flex justify-between  w-full">
                <div className="bg-gradient-to-r from-blue-900  w-[30%] text-white font-bold pl-2">sign:</div>
                <div className="block w-[70%] pl-3 text-black font-bold">{uploadedSign}</div>
              </div>
            ) : (
              <img
                //   src={uploadedSign.dataUrl}
                alt={uploadedSign}
                className="h-12 w-40 object-contain border"
              />
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
              <TextSign onClose={() => handleClose()} createSignModal = {onClose}/>
            )}
            {/* {signModalValue === "draw" && (
              <DrawSign onClose={() => setIsModalOpen(false)} />
            )}
            {signModalValue === "upload" && (
              <UploadSign onClose={() => setIsModalOpen(false)} />
            )} */}
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
