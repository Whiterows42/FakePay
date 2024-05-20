import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromCamera } from "../../features/CreateSlice";
import "./ScanQrCam.css"; // Import the CSS file for styling

const ScanQrCam = () => {
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const [qrData, setQrData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Camdata = useSelector((state) => state.data.CamData);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      qrScannerRef.current = new QrScanner(
        videoElement,
        (result) => setQrData(result.data),
        {
          onDecodeError: (error) => console.error(error),
          preferredCamera: "environment",
          maxScansPerSecond: 10,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      // Start the QR scanner
      qrScannerRef.current.start().catch(console.error);

      return () => {
        qrScannerRef.current.stop();
      };
    }
  }, []);

  if (qrData) {
    qrScannerRef.current.stop();
    dispatch(getDataFromCamera(qrData));
    console.log(Camdata);
    navigate("/");
  }
useEffect(() => {
  const id = setTimeout(() => {
    qrScannerRef.current.stop();
    dispatch(getDataFromCamera(qrData));
    console.log(Camdata);
    navigate("/");
  }, 10000);

  return () => {
    clearTimeout(id)
  }
}, [])

  return (
    <div className="scanner-container ">
      <video
        ref={videoRef}
        className=" scanner-video  "
      ></video>
      <div className="scan-overlay "></div>
    </div>
  );
};

export default ScanQrCam;
