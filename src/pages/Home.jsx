import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import YogaIcon from "@/components/icons/YogaIcon";

import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center" 
                style={{ backgroundImage: "url('/yoga-hero.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-white px-6 md:px-12">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        Find Your Balance with Yoga
                    </h1>
                    <p className="mt-4 text-lg md:text-xl">
                        Personalized yoga plans, AI-driven guidance, and a holistic approach to well-being.
                    </p>
                    <Link to="/classes">
                        <Button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
                            Explore Classes
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-6 py-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* AI-Powered Guidance */}
                    <Card className="shadow-lg">
                        <CardContent className="p-6">
                        <YogaIcon className="text-blue-600 w-12 h-12 mx-auto" />

                            <h3 className="text-xl font-semibold mt-4">AI-Powered Yoga Plans</h3>
                            <p className="text-gray-600 mt-2">Get customized routines based on your fitness goals.</p>
                        </CardContent>
                    </Card>

                    {/* Flexible Scheduling */}
                    <Card className="shadow-lg">
                        <CardContent className="p-6">
                            <CheckCircleIcon className="text-green-600 w-12 h-12 mx-auto" />
                            <h3 className="text-xl font-semibold mt-4">Flexible Scheduling</h3>
                            <p className="text-gray-600 mt-2">Book and manage your sessions effortlessly.</p>
                        </CardContent>
                    </Card>

                    {/* Wellness & Nutrition */}
                    <Card className="shadow-lg">
                        <CardContent className="p-6">
                        <YogaIcon className="text-blue-600 w-12 h-12 mx-auto" />

                            <h3 className="text-xl font-semibold mt-4">Holistic Wellness</h3>
                            <p className="text-gray-600 mt-2">Receive AI-driven diet and lifestyle suggestions.</p>
                        </CardContent>
                    </Card>

                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 text-white text-center py-12">
                <h2 className="text-3xl font-bold">Start Your Yoga Journey Today</h2>
                <p className="mt-2 text-lg">Sign up now and get your personalized AI-powered yoga routine.</p>
                <Link to="/login">
                    <Button className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200">
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
