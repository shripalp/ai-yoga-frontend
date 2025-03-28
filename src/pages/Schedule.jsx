import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";


const classSchedule = [
 
  {
    day: "Monday",
    time: "6:00 PM",
    duration: "60 min",
    classType: "Hatha Yoga",
    instructor: "Shripal Parikh",
  },
  {
    day: "Wednesday",
    time: "9:00 AM",
    duration: "60 min",
    classType: "Vinyasa Flow",
    instructor: "Shripal Parikh",
  },
   
  {
    day: "Friday",
    time: "6:00 PM",
    duration: "30 min",
    classType: "Meditation & Breathwork",
    instructor: "Shripal Parikh",
  },
];

const classTypes = [
  "All",
  "Vinyasa Flow",
  "Hatha Yoga",
  "Meditation & Breathwork",
];

const Schedule = () => {
  const [selectedClass, setSelectedClass] = useState("All");

  const filteredSchedule =
    selectedClass === "All"
      ? classSchedule
      : classSchedule.filter((c) => c.classType === selectedClass);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/schedule.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold">Our Schedule</h1>
          <p className="mt-4 text-lg md:text-xl">
            Weekly Schedule of Yoga Classes
          </p>
        </div>
      </div>

      {/* Filter by Class Type */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Choose Your Class</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {classTypes.map((type) => (
            <Button
              key={type}
              variant={selectedClass === type ? "default" : "outline"}
              onClick={() => setSelectedClass(type)}
              className="transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Schedule Table */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedule.length > 0 ? (
            filteredSchedule.map((c, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-600">
                    {c.classType}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {c.day} at {c.time} for {c.duration}
                  </p>
                  <p className="text-gray-500">Instructor: {c.instructor}</p>
                 
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No classes available for this type.
            </p>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white text-center py-12">
        <h2 className="text-3xl font-bold">Book Your Yoga Class Today</h2>
        <p className="mt-2 text-lg">
          Join a class that fits your schedule and experience the benefits of
          yoga.
        </p>
        <Link to="/schedule">
          <Button className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Schedule;
