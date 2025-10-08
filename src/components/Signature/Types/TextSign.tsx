import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsSignText, setUploadedSign } from "../../../features/sign/signSlice";

type TextSignModalProps = {
  onClose: () => void;
  createSignModal: () => void;
};

function TextSign ({ onClose,createSignModal }:TextSignModalProps) {

  const [text, setText] = useState("");
  const dispatch = useDispatch()

  const handleSave = (text:string)=>{
    if(text==='') return
    console.log('text sign save clicked',text);
    dispatch(setIsSignText(true))
    dispatch(setUploadedSign(text))  
    onClose()
    createSignModal()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[400px] p-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="text-lg font-bold mb-3">Add Text</h2>

        {/* Input Section */}
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="textInput" className="font-semibold text-gray-700">
            Enter your text
          </label>
          <input
            id="textInput"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#FEB21A]"
            placeholder="Type something..."
          />
        </div>

        {/* Save Button */}
        <button
          onClick={() => handleSave(text)}
          className="w-full bg-[#FEB21A] text-white py-2 rounded hover:bg-[#ED3F27] transition font-semibold"
        >
          Save
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TextSign;
