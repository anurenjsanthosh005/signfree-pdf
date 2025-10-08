import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setDocs,
  setDownloadState,
  setPreviewState,
} from "../../features/docs/docSlice";
import Timer from "../UI/Timer";

function Completed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="
    container mx-auto 
    text-lg sm:text-xl md:text-2xl font-bold 
    flex flex-col justify-center items-center 
    bg-[#FEB21A] text-white 
    min-h-[150px] 
    w-[300px] sm:w-[400px] md:w-[700px] lg:w-[800px] 
    rounded-xl p-4
    gap-5
  "
    >
      <h1>Download completed</h1>
      <button
        className="bg-[#134686] text-white border-2 font-semibold px-6 py-2 rounded hover:bg-[#ED3F27] transition"
        onClick={() => {
          navigate("/", { replace: true });
          dispatch(setPreviewState(false));
          dispatch(setDocs(null));
          dispatch(setDownloadState(false));
        }}
      >
        Home
      </button>
      <Timer
        initialSeconds={5}
        onFinish={() => {
          navigate("/", { replace: true });
          dispatch(setPreviewState(false));
          dispatch(setDocs(null));
          dispatch(setDownloadState(false));
        }}
      />
    </div>
  );
}

export default Completed;
