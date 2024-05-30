import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Componant/AppBar";
import Footer from "./Componant/Footer";

function App() {
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

  return (
    <div>
      <ResponsiveAppBar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
