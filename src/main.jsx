import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider, useDispatch } from "react-redux";
import { store } from "./Store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";
import GpayScreenshot from "./Componant/GpayScreenshot.jsx";
import TermsPopup from "./Componant/terms/Terms.jsx";
import ScanQrCam from "./Componant/ScanCamra/ScanQrCam.jsx";
import UnderDevlopment from "./Componant/Message/UnderDevlopment.jsx";
import Login from "./Componant/login/Login.jsx";
import QrScanner2 from "./Componant/QrScanner.jsx";
import Signup from "./Componant/login/SingUp.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<QrScanner2 />} />
        <Route path="terms" element={<TermsPopup />} />
        <Route path="underDevlopment" element={<UnderDevlopment />} />
      </Route>
      <Route path="Gpay" element={<GpayScreenshot />} />
      <Route path="scan" element={<ScanQrCam />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
