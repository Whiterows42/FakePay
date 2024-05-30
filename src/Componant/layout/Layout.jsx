import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Componant/AppBar";
import Footer from "./Componant/Footer";

const Layout = () => {
    
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
