import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MainLayout from "./layouts/MainLayout"
import DocEditPage from "./pages/DocEditPage"
import {pdfjs } from "react-pdf";
import DownloadingPage from "./pages/DownloadingPage";
import AddSignPage from "./components/Signature/AddSign";

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/node_modules/pdfjs-dist/build/pdf.worker.js";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              // <ProtectedRoute>
                <MainLayout/>
              // </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="edit" element={<DocEditPage/>} />
            <Route path="download" element={<DownloadingPage/>} />
            <Route path="add-sign" element={<AddSignPage/>} />
          </Route>
          {/* <Route element={<SimpleLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Route> */}
        </Routes>

  </BrowserRouter>
  )
}

export default App