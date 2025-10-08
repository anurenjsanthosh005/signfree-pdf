import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";
import Download from "../components/Download/Download";
import Completed from "../components/Completed/Completed";

function DownloadingPage() {
  const downloadState = useSelector(
    (state: RootState) => state.docSlice.downloadState
  );

  const [timePassed, setTimePassed] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  // Track 5-second minimum timer
  useEffect(() => {
    const timer = setTimeout(() => setTimePassed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Show Completed only after 5s AND downloadState is true
  useEffect(() => {
    if (timePassed && downloadState) {
      setShowCompleted(true);
    }
  }, [timePassed, downloadState]);

  return (
    <div className="flex flex-col mt-[100px]">
      {showCompleted ? <Completed /> : <Download />}
    </div>
  );
}

export default DownloadingPage;
