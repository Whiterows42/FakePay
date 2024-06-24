import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./Componant/AppBar";
import Footer from "./Componant/Footer";
import Loder from "./Componant/Loader/Loder";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./features/CreateSlice";
import { Analytics } from "@vercel/analytics/react";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isLoading1 = useSelector((state) => state.data.loading);

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
    // Simulate a loading delay (replace this with your actual data loading logic)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      dispatch(setLoading(false));
    }, 4000);

    // Cleanup the timeout if the component unmounts or data loading completes
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading ) {
      // Check if userEmail is present in localStorage
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        navigate("/home");
      }
    }
  }, [isLoading, navigate]);

  return (
    <>
      <ResponsiveAppBar />
      {isLoading || isLoading1 ? <Loder /> : <Outlet />}
      {/* <Footer /> */}
      <Analytics />
    </>
  );
}

export default App;
