import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Componant/AppBar";
import Footer from "./Componant/Footer";
import Loder from "../Loader/Loder";

const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate a loading delay (replace this with your actual data loading logic)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    // Cleanup the timeout if the component unmounts or data loading completes
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loder />
      ) : (
        <>
          <ResponsiveAppBar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
