import "./App.css";
import QrReader2 from "./Componant/QrReader";
import QrScanner2 from "./Componant/QrScanner";
import QrScanner from "./Componant/QrScanner";
import ResponsiveAppBar from "./Componant/AppBar";
import Footer from "./Componant/Footer";
import { useEffect } from "react";


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
    <>
      <ResponsiveAppBar />
      <QrScanner2/>
      
    </>
  );
}

export default App;
