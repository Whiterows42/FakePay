import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error: ", e);
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7565338492649119"
        data-ad-slot="6292891004"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7565338492649119"
        data-ad-slot="2490458933"
      ></ins>
    </>
  );
};

export default AdComponent;
