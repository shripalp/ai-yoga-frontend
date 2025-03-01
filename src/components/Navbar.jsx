import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
    const [user] = useAuthState(auth);

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">

                {/* Left side: Logo */}
                <div>
                    <img src="/logo.png" alt="Yoga Logo" className="h-10" />
                </div>
               

                {/* Center: Navigation Links */}
                <ul className="hidden md:flex space-x-6">
                    <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
                    <li><Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link></li>
                    <li><Link to="/classes" className="text-gray-700 hover:text-blue-600">Classes</Link></li>
                    <li><Link to="/schedule" className="text-gray-700 hover:text-blue-600">Schedule</Link></li>
                    <li><Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link></li>
                    <li><Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
                </ul>

                
                {/* Right Side: Login Button */}
                <div>
                    {user ? (
                        <Link to="/dashboard" className="text-blue-600 font-semibold hover:underline">
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
