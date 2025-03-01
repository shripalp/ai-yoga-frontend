import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
    const [user] = useAuthState(auth);

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                
                {/* Right Side: Logo */}
                <div>
                    <img src="/logo.png" alt="Third Limb Yoga Logo" className="h-22" />
                </div>

                {/* Center: Desktop Navigation Links */}
                <ul className="hidden md:flex space-x-6">
                    <li><Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
                    <li><Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link></li>
                    <li><Link to="/classes" className="text-gray-700 hover:text-blue-600">Classes</Link></li>
                    <li><Link to="/schedule" className="text-gray-700 hover:text-blue-600">Schedule</Link></li>
                    <li><Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link></li>
                    <li><Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
                </ul>

                 {/* Left Side: Login/Dashboard */}
                 <div>
                    {user ? (
                        <Link to="/dashboard">
                            <Button variant="ghost" className="text-blue-600 font-semibold">
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <Button variant="ghost" className="text-blue-600 font-semibold">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>


               

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="flex flex-col space-y-4 mt-8">
                                <Link to="/" className="text-lg text-gray-700 hover:text-blue-600">Home</Link>
                                <Link to="/about" className="text-lg text-gray-700 hover:text-blue-600">About Us</Link>
                                <Link to="/classes" className="text-lg text-gray-700 hover:text-blue-600">Classes</Link>
                                <Link to="/schedule" className="text-lg text-gray-700 hover:text-blue-600">Schedule</Link>
                                <Link to="/pricing" className="text-lg text-gray-700 hover:text-blue-600">Pricing</Link>
                                <Link to="/contact" className="text-lg text-gray-700 hover:text-blue-600">Contact</Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
