import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Classes = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/yoga-classes.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold">
            Yoga Classes for Every Level
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Choose the perfect class to match your goals and experience level.
          </p>
        </div>
      </div>

      {/* Class Offerings Section */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Explore Our Classes
        </h2>
        <p className="text-gray-600 mt-4">
          Find the class that suits your needs and start your yoga journey
          today.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vinyasa Flow */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <img
                src="/vinyasa.jpg"
                alt="Vinyasa Flow"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4">Vinyasa Flow</h3>
              <p className="text-gray-600 mt-2">
                A dynamic, flowing style that links breath with movement.
              </p>
              <p className="text-gray-500 mt-1">
                Duration: 60 min | Level: All
              </p>
            </CardContent>
          </Card>

          {/* Hatha Yoga */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <img
                src="/hatha.jpg"
                alt="Hatha Yoga"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4">Hatha Yoga</h3>
              <p className="text-gray-600 mt-2">
                A gentle and slow-paced practice focused on alignment and
                balance. Suitable for all levels.
              </p>
              <p className="text-gray-500 mt-1">
                Duration: 60 min | Level: Beginner
              </p>
            </CardContent>
          </Card>



          {/* Meditation & Breathwork */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <img
                src="/meditation.jpg"
                alt="Meditation & Breathwork"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4">
                Meditation & Breathwork
              </h3>
              <p className="text-gray-600 mt-2">
                A practice focusing on mindfulness and deep breathing.
              </p>
              <p className="text-gray-500 mt-1">
                Duration: 30 min | Level: All
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white text-center py-12">
        <h2 className="text-3xl font-bold">Ready to Start?</h2>
        <p className="mt-2 text-lg">Sign up today and book your first class.</p>
        <Link to="/schedule">
          <Button className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Classes;
