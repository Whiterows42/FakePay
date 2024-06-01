import React from 'react'
import "./Loder.css"
const Loder = () => {
  return (
    <div className='flex h-[100vh] w-full justify-center items-center'>
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Loder