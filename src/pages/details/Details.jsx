import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const Details = () => {

  const { id } = useParams();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [drawing, setDrawing] = useState(false);

  // start camera
  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    startCamera();
  }, []);

  // capture photo
  const capturePhoto = () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 400;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/png");

    setPhoto(image);
  };

  // drawing functions
  const startDraw = () => setDrawing(true);
  const stopDraw = () => setDrawing(false);

  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // merge photo + signature
  const mergeImage = () => {

    const finalCanvas = document.createElement("canvas");
    const ctx = finalCanvas.getContext("2d");

    const img = new Image();
    img.src = photo;

    img.onload = () => {

      finalCanvas.width = img.width;
      finalCanvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.drawImage(canvasRef.current, 0, 0);

      const merged = finalCanvas.toDataURL("image/png");

      console.log("Merged Image:", merged);

      alert("Image merged successfully!");
    };
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">
        Identity Verification - Employee {id}
      </h2>

      {!photo && (
        <div className="space-y-4">

          <video
            ref={videoRef}
            autoPlay
            className="w-full rounded border"
          />

          <button
            onClick={capturePhoto}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Capture Photo
          </button>

        </div>
      )}

      {photo && (
        <div className="relative">

          <img
            src={photo}
            alt="Captured"
            className="w-full rounded"
          />

          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            className="absolute top-0 left-0"
            onMouseDown={startDraw}
            onMouseUp={stopDraw}
            onMouseMove={draw}
          />

          <button
            onClick={mergeImage}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Save Verification
          </button>

        </div>
      )}

    </div>
  );
};

export default Details;