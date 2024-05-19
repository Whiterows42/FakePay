import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import QrScanner from "qr-scanner";
import "./QRScanCSs.css";
import { IoIosQrScanner } from "react-icons/io";
import checkImage from "./check.png";
import { QrReader } from "react-qr-reader";
import { LuHardDriveUpload } from "react-icons/lu";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { getDataGpay } from "../features/CreateSlice";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import TermsPopup from "./terms/Terms";
const QrScanner2 = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [ammount, setAmmount] = useState(null);
  const [inputammout, setInputammout] = useState(" ");
  const fileRef = useRef();
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [renderBtn, setRenderBtn] = useState(false);
  const [setshowprevidw, setSetshowprevidw] = useState(false);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleclick = () => {
    fileRef.current.click();
  };
  const handleChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const result = await QrScanner.scanImage(file);
    // console.log(result);

    setData(result);
  };
  const getCurrentDateFormatted = () => {
    const currentDate = new Date();
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  };
  const currentDate = getCurrentDateFormatted();
  const UPIId = Math.floor(1000000000 + Math.random() * 90000000000);
  const handleChangeAmmount = (e) => {
    const value = e.target.value;
    setInputammout(value);

    setIsValidNumber(
      !isNaN(parseFloat(value)) && isFinite(value) && value !== 0
    );
  };
  const sendMessageToTelegramBot = async (message) => {
    const botToken = "6502577327:AAGa1aoOqTPmfyFYu35p8MWVjhz-XKwSJqY";
    const chatId = "1446532690";
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      const response = await axios.post(apiUrl, {
        chat_id: chatId,
        text: message,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const AddAmmount = async (upiString) => {
    const checkTrue = upiString.startsWith("upi://pay?");

    if (checkTrue) {
      try {
        const url = new URL(upiString);

        // Extract the email and name parameters from the query string
        const params = new URLSearchParams(url.search);
        const email = params.get("pa"); // Extracting email before '@'
        const name = decodeURIComponent(params.get("pn")); // Decoding URI component for name

        setEmail(email ? email : "email not found");
        setName(name ? name : "name not found");

        // Assuming inputammout is defined somewhere else
        const amt = new Number(inputammout);
        const exactamt = amt.toLocaleString("en-IN") + ".00";
        setAmmount(exactamt);
        setSetshowprevidw(true);
        setInputammout("");

        // Send data to backend
        const requestData = {
          email: email,
          name: name,
          upiId: UPIId,
          currentDate: currentDate,
          ammount: exactamt,
          userAgreed: agreed,
        };

        dispatch(getDataGpay(requestData));

        const message = JSON.stringify(requestData);

        sendMessageToTelegramBot(message);
        navigate("Gpay");
      } catch (error) {
        console.error("Error processing URL:", error);
      }
    } else {
      alert("Invalid Qr Code:", upiString);
    }
  };

  const [facingMode, setFacingMode] = useState("environment");
  const switchCamera = async () => {
    const constraints = {
      video: {
        facingMode: facingMode === "environment" ? "user" : "environment",
      },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setFacingMode(facingMode === "environment" ? "user" : "environment");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleAgree = () => {
    localStorage.setItem("termsAgreed", "true");
    setAgreed(true);
    setOpen(false);
  };

  const handleDisAgree = () => {
    localStorage.setItem("termsAgreed", "false");
    setAgreed(false);
    setOpen(false);
  };
  useEffect(() => {
    const userAgreed = localStorage.getItem("termsAgreed") === "true";
    setAgreed(userAgreed);
    setOpen(userAgreed === true ? false : true);
  }, []);

  const [isChecked, setisChecked] = useState(false)
   const handleCheckboxChange = (event) => {
     setisChecked(event.target.checked);
   };
  return (
    <div className="sm:w-full md:px-1">
      <div className=" bg-[#1976d2] p-4 flex justify-center items-center mb-3">
        <h1 className="font-bold text-white text-pretty text-3xl py-2">
          Payment Screenshot Generator
        </h1>
      </div>
      <div
        className={`mb-5 flex justify-center items-center ${
          !data ? "block" : "hidden"
        } `}
      >
        <div className="h-1/2 w-1/3">
          <div className="flex justify-center">
            <button
              onClick={() => setRenderBtn(true)}
              className="p-2 bg-green-300 font-bold flex items-center gap-2 rounded-md h-full w-fit"
            >
              Scan QR <IoIosQrScanner />
            </button>
          </div>
          {renderBtn && (
            <div className="relative ">
              <div>
                {facingMode === "environment" ? (
                  <QrReader
                    className="mb-3"
                    onResult={(result, error) => {
                      if (!!result) {
                        setData(result.text);
                      }
                      if (!!error) {
                        console.info(error);
                      }
                    }}
                    style={{ width: "400px", height: "200px" }}
                    facingMode={facingMode}
                  />
                ) : (
                  <video
                    className="mb-3"
                    ref={videoRef}
                    style={{ width: "400px", height: "200px" }}
                    autoPlay
                    playsInline
                    onError={(e) => console.error(e)}
                  ></video>
                )}
                {/* Render the data if available */}
              </div>
              <button onClick={switchCamera}>Switch Camera</button>
              <div className=" h-full w-full myanimation top-0 animationdiv">
                <div className="">
                  <p>Scanning...</p>
                  <em></em>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="flex gap-5 justify-center ">
      </div> */}

      <div className="">
        <div className="mb-3 flex justify-center">
          <input
            type="file"
            className="hidden"
            accept="png jpeg jpg"
            ref={fileRef}
            // value={file}
            onChange={(e) => handleChange(e)}
          />

          <button
            onClick={handleclick}
            className="bg-blue-500 text-white flex items-center gap-2 font-bold rounded-md"
          >
            Upload Image
            <LuHardDriveUpload />
          </button>
        </div>
        {data ? (
          <div>
            <div
              className="flex flex-col items-center justify-center"
              // onSubmit={(e) => {
              //   e.preventDefault();
              // }}
            >
              <TextField
                className="border bottom-1 border-black rounded-sm p-2"
                id="outlined-basic"
                error={!isValidNumber}
                label="Enter Ammount"
                variant="outlined"
                value={inputammout}
                inputProps={{ inputMode: "numeric" }} // Set input mode to numeric
                onChange={(e) => handleChangeAmmount(e)}
              />
              {!isValidNumber ? (
                <p className="text-red-600"> Enter valid Ammount </p>
              ) : null}
              <button
                disabled={!isValidNumber}
                onClick={() => AddAmmount(data)}
                type="submit"
                className="disabled:bg-violet-300 bg-violet-700 mt-4 font-bold text-white outline-none"
              >
                {" "}
                Add
              </button>
            </div>
          </div>
        ) : null}

        <Dialog
          // fullScreen={fullScreen}
          open={open}
          // onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"  Tems And Conditions "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="flex flex-col">
              By using our services, you agree to comply with these terms. You
              must use our resources responsibly and not engage in harmful
              activities. We provide resources "as is" without warranties. Any
              misuse may result in account termination and legal consequences.
              Please ensure all provided information is accurate and up to date.
              <Link to={"terms"} className="text-blue-800 cursor-pointer">
                {" "}
                see all terms & conditions{" "}
              </Link>
              <label className="flex flex-row items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  name="check"
                  value={isChecked}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />{" "}
                I agree with terms and conditions
              </label>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDisAgree}>
              Disagree
            </Button>
            <Button
              disabled={isChecked === false ? true : false}
              onClick={handleAgree}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default QrScanner2;
