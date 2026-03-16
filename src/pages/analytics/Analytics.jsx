import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet default icon fix (Markers missing issue handle করার জন্য)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;


const cityCoords = {
  "Edinburgh": [55.9533, -3.1883],
  "Tokyo": [35.6762, 139.6503],
  "San Francisco": [37.7749, -122.4194],
  "New York": [40.7128, -74.0060],
  "London": [51.5074, -0.1278],
  "Sidney": [-33.8688, 151.2093],
  "Singapore": [1.3521, 103.8198]
};

const Analytics = () => {
  const [data, setData] = useState([]);
  const [mergedImage, setMergedImage] = useState(null);

  useEffect(() => {
    // Load audit image from localStorage
    const img = localStorage.getItem("auditImage");
    setMergedImage(img);

    // Fetch employee data
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://backend.jotish.in/backend_dev/gettabledata.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: "test",
              password: "123456",
            }),
          }
        );

        const json = await res.json();
        setData(json?.TABLE_DATA?.data || []);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    fetchData();
  }, []);

  // Salary aggregation logic
  const citySalary = {};
  data.forEach((row) => {
    const city = row[2];
  
    const rawSalary = row[5].replace(/[$,]/g, "");
    const salary = Number(rawSalary) || 0;

    if (!citySalary[city]) citySalary[city] = 0;
    citySalary[city] += salary;
  });

  const cities = Object.keys(citySalary);
  const maxSalary = Math.max(...Object.values(citySalary), 1);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10 font-sans">
      <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Verification Result */}
        <div className="bg-white p-4 rounded-xl shadow-md border">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Verification Result</h3>
          {mergedImage ? (
            <img src={mergedImage} alt="Audit" className="border rounded shadow-sm w-full h-auto max-w-xs" />
          ) : (
            <div className="h-48 flex items-center justify-center bg-gray-50 border-2 border-dashed rounded-lg">
               <p className="text-gray-400">No verification image available</p>
            </div>
          )}
        </div>

        {/* Salary Distribution Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md border overflow-hidden">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Salary Distribution by City</h3>
          <svg width="100%" height="300" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
            {cities.map((city, i) => {
              const barHeight = (citySalary[city] / maxSalary) * 200;
              const xPos = i * 85 + 40;
              return (
                <g key={city}>
                  <rect
                    x={xPos}
                    y={250 - barHeight}
                    width="40"
                    height={barHeight}
                    fill="#3b82f6"
                    rx="4"
                  />
                  <text x={xPos + 20} y={270} textAnchor="middle" fontSize="10" className="fill-gray-500 font-medium">
                    {city}
                  </text>
                  <text x={xPos + 20} y={245 - barHeight} textAnchor="middle" fontSize="9" className="fill-blue-600 font-bold">
                    ${(citySalary[city] / 1000).toFixed(0)}k
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white p-4 rounded-xl shadow-md border">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Global City Locations</h3>
        <div className="rounded-lg overflow-hidden border">
          <MapContainer
            center={[20, 0]} 
            zoom={2}
            style={{ height: "450px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map((city) => {
              const coords = cityCoords[city];
              if (!coords) return null;

              return (
                <Marker key={city} position={coords}>
                  <Popup>
                    <div className="text-center">
                      <strong className="text-blue-600">{city}</strong> <br />
                      Total Salary: <span className="font-bold">${citySalary[city].toLocaleString()}</span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;