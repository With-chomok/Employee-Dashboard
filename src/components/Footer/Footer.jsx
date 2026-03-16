import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-10 border-t bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">

        {/* Left */}
        <p>
          © {new Date().getFullYear()} Employee Insights Dashboard
        </p>

        {/* Center Links */}
        <div className="flex gap-6">
          <Link to={"#"} className="hover:text-blue-500">
            Privacy
          </Link>

          <Link to={"#"} className="hover:text-blue-500">
            Terms
          </Link>

          <Link to={"#"} className="hover:text-blue-500">
            Support
          </Link>
        </div>

        {/* Right */}
        <p className="text-gray-500">
          Built with React by <span className="italic text-black">dipol</span>
        </p>

      </div>
    </footer>
  );
};

export default Footer;