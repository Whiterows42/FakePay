import React from 'react'
import underD from "./underD.mp4"
import './Message.css'
const UnderDevlopment = () => {
  return (
    <div className=" underDevlop h-full w-full video-background">
      <video autoPlay loop muted className="video">
        <source src={underD} type="video/mp4" />
      </video>
    </div>
  );
}

export default UnderDevlopment