import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function OtpInput({ length = 6, onOtpSubmit = () => {}, reset, error , helperText }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

 const snackbar = useSelector((state) => state.data.snakmessage);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (reset) {
      setOtp(new Array(length).fill(""));
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [reset]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")];
    }
  };

  return (
    <div className="flex justify-center items-center p-10">
      {otp.map((value, index) => (
        <input
          type="text"
          inputMode="numeric"
          key={index}
          ref={(input) => (inputRefs.current[index] = input)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={`OtpInput w-10 ml-3 text-black cursor-text text-2xl font-bold text-center flex justify-center items-center h-[55px] ${
            snackbar?.message === "Invalid OTP" ? "border-red-500 border-2" : ""
          }`}
        />
      ))}
      {/* {error && <div className="error-text">{helperText}</div>} */}
    </div>
  );
}

export default OtpInput;
