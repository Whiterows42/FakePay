import React, { useState } from "react";
import {QrReader} from "react-qr-reader";

const QrReader2 = () => {
  const [showQrReader, setShowQrReader] = useState(true);
  const [data, setData] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setData(result);
      // Once you have scanned the QR code successfully, you may want to stop the QR reader.
      setShowQrReader(false);
    }
  };

  const handleError = (error) => {
    console.error(error);
    // Handle errors if needed
  };

  return (
    <div>
      {showQrReader && (
        <QrReader
          className="mb-3"
          onScan={handleScan}
          onError={handleError}
          style={{ width: "400px", height: "200px" }}
        />
      )}
      {/* Render the data if available */}
      {data && <p>Scanned data: {data}</p>}
    </div>
  );
};

export default QrReader2;
