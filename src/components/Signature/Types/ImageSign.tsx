import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import {
  setSignPreview,
  setUploadedFileSign,
} from "../../../features/sign/signSlice";
import PreviewSignComponent from "../PreviewSignComponent";

type ImageSignProps = {
  onClose: () => void;
  createSignModal: () => void;
};

function ImageSign({ onClose, createSignModal }: ImageSignProps) {
  const { signPreviewState } = useSelector(
    (state: RootState) => state.signSlice
  );
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="bg-white rounded-lg shadow-lg w-[400px] p-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-3">Upload Signature</h2>

        {/* Buttons Section */}
        <div className="flex gap-2 mt-2">
          {/* Gallery Button */}
          <div className="flex-1">
            <input
              type="file"
              id="fileInput"
              accept=".pdf, .jpeg, .jpg, .png"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  dispatch(setUploadedFileSign(file));
                  dispatch(setSignPreview(true));
                }
                e.target.value = "";
              }}
            />
            <label
              htmlFor="fileInput"
              className="w-full bg-[#FEB21A] text-white py-2 rounded hover:bg-[#ED3F27] transition font-semibold cursor-pointer flex justify-center items-center"
            >
              <i className="fa-solid fa-images mr-2"></i> Gallery
            </label>
          </div>
        </div>

        {signPreviewState && (
          <PreviewSignComponent
            onClose={() => dispatch(setSignPreview(false),onClose,createSignModal())}
          />
        )}
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
}

export default ImageSign;
