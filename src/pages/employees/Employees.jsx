import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const Employees = () => {
  const [data, setData] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const rowHeight = 60;
  const buffer = 5;
  const containerHeight = 600;

  // Fetch API data
  useEffect(() => {
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
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const onScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Virtualization math
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
  const visibleCount = Math.ceil(containerHeight / rowHeight);
  const endIndex = Math.min(data.length, startIndex + visibleCount + buffer * 2);

  const visibleRows = data.slice(startIndex, endIndex);

  return (
    <div className="p-4 max-w-7xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Employee List
      </h2>

      {/* Table Header */}
      <div className=" bg-gray-200 hidden md:flex font-semibold px-4 py-3 text-sm  rounded-t-lg min-w-200">
        <span className="w-15">ID</span>
        <span className="flex-1">Name</span>
        <span className="flex-1">Department</span>
        <span className="flex-1">City</span>
        <span className="flex-1">Role</span>
        <span className="flex-1 ">Date</span>
        <span className="flex-1 text-right">Salary</span>
      </div>

      {/* Scroll Wrapper */}
      <div className="overflow-x-auto border border-gray-200  rounded-lg shadow-sm">
        <div
          ref={containerRef}
          onScroll={onScroll}
          className="min-w-200"
          style={{
            height: containerHeight,
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Virtual Spacer */}
          <div
            style={{
              height: data.length * rowHeight,
              width: "100%",
              position: "relative",
            }}
          >
            {visibleRows.map((row, index) => {
              const actualIndex = startIndex + index;

              return (
                <div
                  key={actualIndex}
                  onClick={() => navigate(`/details/${actualIndex}`)}
                  className={`flex items-center px-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                    actualIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                  style={{
                    position: "absolute",
                    top: actualIndex * rowHeight,
                    height: rowHeight,
                    left: 0,
                    right: 0,
                    borderBottom: "1px solid #edf2f7",
                  }}
                >
                  <span className="w-12 font-medium text-gray-500">
                    {actualIndex + 1}
                  </span>

                  <span className="flex-1 truncate px-2 text-sm">
                    {row[0]}
                  </span>

                  <span className="flex-1 truncate px-2 text-sm font-semibold">
                    {row[1]}
                  </span>

                  <span className="flex-1 truncate px-2 text-sm">
                    {row[2]}
                  </span>

                  <span className="flex-1 truncate px-2 text-sm">
                    {row[3]}
                  </span>

                  <span className="flex-1 truncate px-2 text-sm">
                    {row[4]}
                  </span>

                  <span className="flex-1 truncate px-2 text-sm text-right">
                    {row[5]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Showing {data.length} total employees
      </p>
    </div>
  );
};

export default Employees;