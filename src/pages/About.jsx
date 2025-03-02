import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
                style={{ backgroundImage: "url('/yoga-hero.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-white px-6 md:px-12">
                    <h1 className="text-4xl md:text-6xl font-bold">About Third Limb Yoga</h1>
                    <p className="mt-4 text-lg md:text-xl">
                        Empowering mind, body, and soul through yoga.
                    </p>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="container mx-auto px-6 py-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                <p className="text-gray-600 mt-4">
                    At Third Limb Yoga, our mission is to promote health, mindfulness, and well-being
                    through the ancient practice of yoga. We strive to create a community where individuals
                    of all levels can experience balance, flexibility, and peace.
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-12">Our Vision</h2>
                <p className="text-gray-600 mt-4">
                    We envision a world where yoga is accessible to all, fostering inner harmony and physical
                    strength. Our AI-powered guidance and personalized routines help each student reach their
                    full potential.
                </p>
            </div>

            {/* Meet the Team Section */}
            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Meet Our Instructors</h2>
                    <p className="text-gray-600 mt-4">Our passionate and certified yoga instructors are here to guide you.</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Instructor 1 */}
                        <Card className="shadow-lg invisible">
                            <CardContent className="p-6">
                                <img src="/instructor1.jpg" alt="Instructor" className="w-48 h-48 mx-auto rounded-full" />
                                <h3 className="text-xl font-semibold mt-4">Emma Thompson</h3>
                                <p className="text-gray-600">Expert in Vinyasa & Mindfulness</p>
                            </CardContent>
                        </Card>

                        {/* Instructor 2 */}
                        <Card className="shadow-lg">
                            <CardContent className="p-6">
                                <img src="/instructor2.jpg" alt="Instructor" className="w-48 h-48 mx-auto rounded-full" />
                                <h3 className="text-xl font-semibold mt-4">Shripal Parikh, e-RYT 200h</h3>
                                <p className="text-gray-600">Yoga Instructor</p>
                            </CardContent>
                        </Card>

                        {/* Instructor 3 */}
                        <Card className="shadow-lg invisible">
                            <CardContent className="p-6">
                                <img src="/instructor3.jpg" alt="Instructor" className="w-48 h-48 mx-auto rounded-full" />
                                <h3 className="text-xl font-semibold mt-4">Sophia Lee</h3>
                                <p className="text-gray-600">Restorative & Healing Yoga</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 text-white text-center py-12">
                <h2 className="text-3xl font-bold">Join Our Yoga Community</h2>
                <p className="mt-2 text-lg">Start your journey to wellness today.</p>
                <Button className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200">
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default About;
