import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import GpayScreenshot from './Componant/GpayScreenshot.jsx'
import TermsPopup from './Componant/terms/Terms.jsx'
import ScanQrCam from './Componant/ScanCamra/ScanQrCam.jsx'
import UnderDevlopment from './Componant/Message/UnderDevlopment.jsx'

const route  = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route  path="/" element={<App/>}  />
        {/* <Route path= "Gpay" element={<GpayScreenshot/>} /> */}
        <Route path='terms' element={<TermsPopup/>} />
        <Route path='scan' element={<ScanQrCam/>} />
        <Route path='underDevlopment' element={<UnderDevlopment/>} />
        </>
    )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
);
