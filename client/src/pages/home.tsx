import React, { useState } from "react";
import { createShortUrl } from "../api/user";


function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [qr,setQr] = useState('')

  const handleSubmitToCreateShortUrl = async () => {
    try {
      if (!longUrl) {
        alert("Please enter a long URL");
        return;
      }
      const short = await createShortUrl(longUrl, customName);
      setShortUrl(short.existing.shortUrl);
      setQr(short.qr)
      setShowQR(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">TinyURL</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-bold mb-2">Welcome to TinyURL</h2>
        <p className="text-gray-400 mb-8">
          Shorten your long links easily and share them with the world.
        </p>

        {/* Inputs Container */}
        <div className="flex flex-col gap-3 w-full max-w-lg">
          {/* Long URL Input */}
          <input
            type="text"
            placeholder="Enter your long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="bg-black text-white px-6 py-3 rounded focus:outline-none w-full"
          />

          {/* Custom Name Input */}
          <input
            type="text"
            placeholder="Custom short name (optional)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="bg-black text-white px-6 py-3 rounded focus:outline-none w-full"
          />

          {/* Generate Button */}
          <button
            onClick={handleSubmitToCreateShortUrl}
            className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded font-semibold w-full"
          >
            Generate Short URL & QR Code
          </button>
        </div>

        {/* Result Section */}
        {shortUrl && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="text-lg">
              Short URL:{" "}
              <a
                href={`http://localhost:4000/api/url/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {`http://localhost:4000/api/url/${shortUrl}`}
              </a>
            </p>
          {shortUrl&&(<img src={qr} alt="scanqr" />)}
            {/* QR Code */}
            
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 p-4">
        &copy; {new Date().getFullYear()} Irshadudheen. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
