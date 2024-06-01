import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Componant/AppBar";
import Footer from "./Componant/Footer";
import Loder from "./Componant/Loader/Loder";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./features/CreateSlice";

function App() {
  const dispatch = useDispatch();
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

  const [isLoading, setIsLoading] = useState(true);
  const isLoading1 = useSelector((state) => state.data.loading);
  useEffect(() => {
    // Simulate a loading delay (replace this with your actual data loading logic)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      dispatch(setLoading(false))
    }, 4000);

    // Cleanup the timeout if the component unmounts or data loading completes
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      {
        isLoading1 ? (
          <Loder/>
        ):(
      <div className="content">
        <Outlet />
      </div>

        )
      }
      <Footer />
    </div>
  );
}

export default App;
