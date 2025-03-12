import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const classSchedule = [
  {
    day: "Monday",
    time: "8:00 AM",
    classType: "Vinyasa Flow",
    instructor: "Emma Thompson",
  },
  {
    day: "Monday",
    time: "6:00 PM",
    classType: "Hatha Yoga",
    instructor: "Raj Patel",
  },
  {
    day: "Tuesday",
    time: "9:00 AM",
    classType: "Power Yoga",
    instructor: "Sophia Lee",
  },
  {
    day: "Tuesday",
    time: "5:30 PM",
    classType: "Restorative Yoga",
    instructor: "Emma Thompson",
  },
  {
    day: "Wednesday",
    time: "7:00 AM",
    classType: "Prenatal Yoga",
    instructor: "Raj Patel",
  },
  {
    day: "Thursday",
    time: "10:00 AM",
    classType: "Meditation & Breathwork",
    instructor: "Sophia Lee",
  },
  {
    day: "Thursday",
    time: "7:00 PM",
    classType: "Vinyasa Flow",
    instructor: "Emma Thompson",
  },
  {
    day: "Friday",
    time: "6:00 PM",
    classType: "Power Yoga",
    instructor: "Raj Patel",
  },
];

const classTypes = [
  "All",
  "Vinyasa Flow",
  "Hatha Yoga",
  "Power Yoga",
  "Restorative Yoga",
  "Prenatal Yoga",
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
        style={{ backgroundImage: "url('/yoga-classes.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold">Class Schedule</h1>
          <p className="mt-4 text-lg md:text-xl">
            Find a class that fits your schedule and book your spot today.
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
                    {c.day} at {c.time}
                  </p>
                  <p className="text-gray-500">Instructor: {c.instructor}</p>
                  {/* Embed Calendly */}
                  <div className="flex justify-center mt-6">
                    <Button
                      className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() =>
                        window.open(
                          "https://calendly.com/shripalp/60min",
                          "_blank",
                        )
                      }
                    >
                      Book Now
                    </Button>
                  </div>
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
        <Link to="/login">
          <Button className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Schedule;
