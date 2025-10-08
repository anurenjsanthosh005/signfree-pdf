import AddFilesComponent from "../components/Files/AddFilesComponent";
import HowToUse from "../components/HowToUse/HowToUse";
import PreviewFilesComponent from "../components/Files/PreviewFilesComponent";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

function HomePage() {

  const{previewState} = useSelector((state:RootState)=>state.docSlice)

  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col items-center justify-center text-center px-4 py-5 gap-4 relative">
      <h1 className="text-3xl font-bold">Why SignFreePDF?</h1>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-7">
        Add signatures to <span className="font-semibold">PDFs</span>, and{" "}
        <span className="font-semibold">JPEGs</span> in seconds. Supports
        <span className="font-semibold">PDFs</span> up to{" "}
        <span className="font-semibold">20 MB</span>, and{" "}
        <span className="font-semibold">Images</span> up to{" "}
        <span className="font-semibold">5 MB .</span> Smooth, straightforward,
        and completely <span className="font-semibold">FREE TO USE.</span>
      </p>

      <AddFilesComponent />
      <HowToUse />

      {/* Preview overlay */}
      {previewState && (
        <PreviewFilesComponent />
      )}
    </div>
  );
}

export default HomePage;
