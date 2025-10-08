import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setDocs, setPreviewState } from "../../features/docs/docSlice";

function AddFilesComponent() {
  const dispatch = useDispatch();
  const { uploadedDoc } = useSelector((state: RootState) => state.docSlice);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#FEB21A] rounded-lg flex flex-col items-center text-center space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Add Files</h2>

      <label className="w-full p-2 rounded border border-[#FDF4E3] bg-[#FDF4E3] text-[#000000] text-left cursor-pointer">
        {uploadedDoc ? uploadedDoc.name : "Select a file..."}
        <input
          type="file"
          accept=".pdf, .jpeg, .jpg, .png"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              dispatch(setDocs(file));
              dispatch(setPreviewState(true));
            }
          }}
        />
      </label>

      <p className="text-white text-sm font-medium sm:text-base">
        Max file sizes: PDF 20 MB, Image 5 MB, DOC 10 MB
      </p>
    </div>
  );
}

export default AddFilesComponent;
