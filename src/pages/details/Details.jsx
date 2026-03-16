import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [drawing, setDrawing] = useState(false);

  // start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    if (!photo) startCamera();
  }, [photo]);

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

  const startDraw = (e) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const stopDraw = () => setDrawing(false);
  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "red";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // merge photo + signature and SAVE to localStorage
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
      const merged = finalCanvas.toDataURL("image/jpeg", 0.8);
      localStorage.setItem("auditImage", merged);
      alert("Verification Saved Successfully!");

      navigate("/analytics");
    };
  };

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-xl shadow-lg bg-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Identity Verification - Employee {id}
      </h2>

      {!photo ? (
        <div className="flex flex-col items-center space-y-4">
          <video
            ref={videoRef}
            autoPlay
            className="w-full rounded-lg border-2 border-gray-200 shadow-sm"
          />
          <button
            onClick={capturePhoto}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition shadow-md">
            Take Photo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div
            className="relative border-4 border-blue-100 rounded-lg overflow-hidden shadow-xl"
            style={{ width: 500, height: 400 }}>
            <img
              src={photo}
              alt="Captured"
              className="absolute top-0 left-0 w-full h-full"
            />
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              className="absolute top-0 left-0 cursor-crosshair"
              onMouseDown={startDraw}
              onMouseUp={stopDraw}
              onMouseMove={draw}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 italic">
            Sign on the photo above
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setPhoto(null)}
              className="px-6 py-2 bg-gray-500 text-white rounded-full">
              Retake
            </button>
            <button
              onClick={mergeImage}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md transition">
              Save & Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
