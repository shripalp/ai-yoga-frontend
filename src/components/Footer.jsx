import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Logo & Description */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <img
            src="/logo.png"
            alt="Third Limb Yoga Logo"
            className="h-12 mx-auto md:mx-0"
          />
          <p className="mt-2 text-sm text-gray-400">
            Empowering mind, body, and soul through yoga.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-col md:flex-row md:space-x-6 text-center">
          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>
          <Link to="/classes" className="hover:text-blue-400">
            Classes
          </Link>
          <Link to="/schedule" className="hover:text-blue-400">
            Schedule
          </Link>
          <Link to="/pricing" className="hover:text-blue-400">
            Pricing
          </Link>
          <Link to="/contact" className="hover:text-blue-400">
            Contact
          </Link>
        </div>

        {/* Right: Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-6 w-6 hover:text-blue-400 transition duration-300" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-6 w-6 hover:text-pink-400 transition duration-300" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-6 w-6 hover:text-blue-400 transition duration-300" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} Third Limb Yoga. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
