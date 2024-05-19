import React, { memo, useEffect, useState } from "react";
import checkImage from "./check.png";
import { useSelector } from "react-redux";
import "./QRScanCSs.css";
import { IoShareSocial } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Gpay = () => {
  const data = useSelector((state) => state.data.data);
const navigate  = useNavigate()
 
  const [addData, setAddData] = useState([])
  useEffect(() => {
  setAddData(data)
  }, [])
   const handleBack = () => {
     navigate("/");
    };
    
  return (
    <>
      {addData && addData.length > 0 ? (
        addData.map((value, index) => (
          <div className="main printable rounded-md mt-2" key={index}>
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
                <button className="text-blue-700 flex items-center gap-2 rounded-full px-6">
                  {" "}
                  <IoShareSocial /> Share screenshot{" "}
                </button>
                <button
                  onClick={handleBack}
                  className="text-white rounded-full px-6 cursor-pointer bg-blue-700"
                >
                  {" "}
                  Close{" "}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No transactions available</p>
      )}
    </>
  );
};

export default memo(Gpay);
