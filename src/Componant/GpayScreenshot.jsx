import React, { memo, useEffect, useRef, useState } from "react";
import checkImage from "./check.png";
import { useSelector } from "react-redux";
import "./QRScanCSs.css";
import { IoShareSocial } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import notificationSound from "./google_pay.mp3"; // Import the audio file

const Gpay = () => {
  const data = useSelector((state) => state.data.data);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [addData, setAddData] = useState([]);
  const screenshotRef = useRef(null);
  const audioRef = useRef(null);
  
  const handleBack = () => {
    navigate("/home");
  };
  useEffect(() => {
    setAddData(data);
  }, [data]);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []); // Play audio when the component mounts

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const captureScreenshot = async () => {
    try {
      const canvas = await html2canvas(screenshotRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const file = new File([blob], "screenshot.png", { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Screenshot",
          text: "Check out this screenshot",
          files: [file],
        });
        setMessage("Screenshot shared successfully!");
      } else {
        setOpen(true);
        setMessage("Your browser does not support the Web Share API");
      }
    } catch (error) {
      console.error("Error sharing screenshot:", error);
      alert("Failed to share screenshot");
    } finally {
      setOpen(true);
      setMessage("Screenshot shared successfully!");
    }
  };

  return (
    <div>
      {addData && addData.length > 0 ? (
        addData.map((value, index) => (
          <div
            ref={screenshotRef}
            className="main printable rounded-md mt-2"
            key={index}
          >
            <div className="content">
              <div className="">
                <div className="flex justify-center items-center">
                  <img src={checkImage} width={100} alt="Check" />
                </div>
              </div>
              <div className="ammount">
                <span
                  style={{ fontWeight: "400" }}
                  className="font-bold"
                  id="Am"
                >
                  ₹{value.ammount}
                </span>
              </div>
              <div className="ReciverInfo">
                <p style={{ fontWeight: "500" }}>Paid to {value.name}</p>
                <p className="email">{value.email}</p>
              </div>
              <div className="ohterinfo">
                <h5 id="dateTime">{value.currentDate}</h5>
                <span
                  className="fontWeight100"
                  style={{ fontWeight: "100 " }}
                  id="UpiId"
                >
                  UPI transaction Id: {value.upiId}
                </span>
              </div>
            </div>
            <div className="done fixed bottom-7">
              <div className="flex gap-4">
                <button
                  onClick={captureScreenshot}
                  className=" bg-black h-12 text-white border-2 border-white flex items-center gap-2 rounded-full px-6"
                >
                  <IoShareSocial /> Share screenshot
                </button>
                <button
                  onClick={handleBack}
                  className="text-white h-12 flex items-center rounded-full px-6 cursor-pointer bg-blue-700"
                >
                  {" "}
                  Close{" "}
                </button>
              </div>
            </div>

            <div style={{ display: !open ? "block" : "none" }}>
              <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No transactions available</p>
      )}
      <audio
        ref={audioRef}
        src={notificationSound}
        style={{ display: "none" }}
        autoPlay
      />
    </div>
  );
};

export default memo(Gpay);
