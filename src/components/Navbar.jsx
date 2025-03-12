import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state

  // Function to close menu when a link is clicked
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/*Left Side: Logo */}
        <div>
          <Link to="/">
            <img src="/logo.png" alt="Third Limb Yoga Logo" className="h-26" />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/classes"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Classes
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Schedule
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/yoga-therapy"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              Yoga Therapy
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col mx-auto my-auto justify-evenly h-full">
                <Link
                  to="/"
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={handleMenuClose}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={handleMenuClose}
                >
                  About Us
                </Link>
                <Link
                  to="/classes"
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={handleMenuClose}
                >
                  Classes
                </Link>
                <Link
                  to="/schedule"
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={handleMenuClose}
                >
                  Schedule
                </Link>
                <Link
                  to="/pricing"
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={handleMenuClose}
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="text-lg text-gray-700 hover:text-blue-600"
                  onClick={handleMenuClose}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right Side: Login/Dashboard */}
        <div>
          {user ? (
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className="text-blue-600 font-semibold text-2xl"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-blue-600 font-semibold text-2xl"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
