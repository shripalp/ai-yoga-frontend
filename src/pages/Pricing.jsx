import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Drop-in Class - Online",
    price: "Free",
    description: "Perfect for those who want to try a single class-Online only.",
    features: [
      "Access to any one class",
      "Valid for one session",
      "No commitment",
    ],
  },
  {
    name: "Monthly Unlimited Pass - Online",
    price: "$40",
    description: "Unlimited access to all yoga classes for a month - Online only.",
    features: ["Unlimited classes", "Valid for one calender month", "Join anytime"],
  },
  {
    name: "Yoga Worskhop In Person - 10 class pass",
    price: "$150",
    description: "In person yoga session at student's location.",
    features: ["Evenings and weekends", "Customized sessions", "Family and friends included in price"],
  },
  
  
];

const backendURL = import.meta.env.VITE_BACKEND_URL; // set in .env
if (!backendURL) {
  console.error("VITE_BACKEND_URL is not set! Please define it in your .env or hosting dashboard.");
}

const handleSubscribe = async () => {
  try {
    const res = await fetch(`${backendURL}/create-checkout-session?price_id=price_1R5bVFJlGz9QeOhkG5acXISi`);
    const data = await res.json();
    window.location.href = data.url;
  } catch (err) {
    console.error("Checkout session failed:", err);
  }
};


const Pricing = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/pricing.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold">
            Pricing Plans
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Choose a plan that fits your lifestyle.
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Our Plans
        </h2>
        <p className="text-gray-600 mt-4">
          Flexible pricing to help you achieve your yoga goals.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
            <Card
        
              className="shadow-lg border border-gray-200 bg-white"
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600">
                  {pricingPlans[1].name}
                </h3>
                <p className="text-gray-800 text-4xl font-bold mt-2">
                  {pricingPlans[1].price}
                </p>
                <p className="text-gray-600 mt-2">{pricingPlans[1].description}</p>

                <ul className="mt-4 text-left space-y-2">
                 
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                      {pricingPlans[1].features[0]}
                    </li>
                  
                </ul>
                 {/* Embed Stripe */}
                 <div className="flex justify-center mt-6">
                  <Button onClick={handleSubscribe} className="bg-green-600 text-white">
                    Subscribe Now – Unlimited Yoga Access
                  </Button>

                  </div>

                
              </CardContent>
            </Card>
            <Card
        
              className="shadow-lg border border-gray-200 bg-white"
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600">
                  {pricingPlans[1].name}
                </h3>
                <p className="text-gray-800 text-4xl font-bold mt-2">
                  {pricingPlans[1].price}
                </p>
                <p className="text-gray-600 mt-2">{pricingPlans[1].description}</p>

                <ul className="mt-4 text-left space-y-2">
                 
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                      {pricingPlans[1].features[0]}
                    </li>
                  
                </ul>
                 {/* Embed Stripe */}
                 <div className="flex justify-center mt-6">
                  <Button onClick={handleSubscribe} className="bg-green-600 text-white">
                    Subscribe Now – Unlimited Yoga Access
                  </Button>

                  </div>

                
              </CardContent>
            </Card>
            <Card
        
              className="shadow-lg border border-gray-200 bg-white"
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600">
                  {pricingPlans[1].name}
                </h3>
                <p className="text-gray-800 text-4xl font-bold mt-2">
                  {pricingPlans[1].price}
                </p>
                <p className="text-gray-600 mt-2">{pricingPlans[1].description}</p>

                <ul className="mt-4 text-left space-y-2">
                 
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                      {pricingPlans[1].features[0]}
                    </li>
                  
                </ul>
                 {/* Embed Stripe */}
                 <div className="flex justify-center mt-6">
                  <Button onClick={handleSubscribe} className="bg-green-600 text-white">
                    Subscribe Now – Unlimited Yoga Access
                  </Button>

                  </div>

                
              </CardContent>
            </Card>
     
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white text-center py-12">
        <h2 className="text-3xl font-bold">Start Your Yoga Journey Today</h2>
        <p className="mt-2 text-lg">
          Find balance, flexibility, and strength with our expert instructors.
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

export default Pricing;
