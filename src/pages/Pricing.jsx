import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const pricingPlans = [
  {
    name: "Drop-in Class - Online",
    price: "Free",
    mode: "payment", // 👈 one-time
    description: "Perfect for those who want to try a single class-Online only.",
    features: [
      "Access to any one class",
      "Valid for one session",
      "No commitment",
    ],
    priceId: "price_1R5bacJlGz9QeOhkulIaHwOK",
  },
  {
    name: "In Person Yoga Session - 1 class pass",
    price: "$40",
    mode: "payment", // 👈 one-time
    description: "Perfect for those who want to try a single class in person only",
    features: [
      "at student's location",
      "weekends and evenings",
      "Friends and Family can join at no extra cost",
    ],
    priceId: "price_1R5bYlJlGz9QeOhkfcG3vkS4",
  },
  {
    name: "Monthly Unlimited Pass - Online",
    price: "$40",
    mode: "subscription", // 👈 recurring
    description: "Unlimited access to all yoga classes for a month - Online only.",
    features: ["Unlimited classes", "Valid for one calender month", "Join anytime"],
    priceId: "price_1R5bVFJlGz9QeOhkG5acXISi",
  },
  {
    name: "Yoga Worskhop In Person - 10 class pass",
    price: "$150",
    mode: "payment", // 👈 one-time
    description: "In person yoga session at student's location.",
    features: ["Evenings and weekends", "Customized sessions", "Family and friends included in price"],
    priceId: "price_1R6M7VJlGz9QeOhk0ZeVgAGX",
    
  },
  
  
];






const Pricing = () => {
  const [loadingPriceId, setLoadingPriceId] = useState(null);

  const handleSubscribe = async (priceId, mode) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    if (!backendURL) {
      console.error("VITE_BACKEND_URL is not set!");
      return;
    }

    try {
      setLoadingPriceId(priceId); // start loading this plan
      const res = await fetch(`${backendURL}/create-checkout-session?price_id=${priceId}&mode=${mode}`);
      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout session failed:", err);
    } finally {
      setLoadingPriceId(null); // reset after done
    }
  };


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
  {pricingPlans.map((plan, index) => (
    <Card key={index} className="shadow-lg border border-gray-200 bg-white">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold text-blue-600">{plan.name}</h3>
        <p className="text-gray-800 text-4xl font-bold mt-2">{plan.price}</p>
        <p className="text-gray-600 mt-2">{plan.description}</p>

        <ul className="mt-4 text-left space-y-2">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
              {feature}
            </li>
          ))}
        </ul>

      
          <div className="flex justify-center mt-6">
            <Button
                    disabled={loadingPriceId === plan.priceId}
                    onClick={() => handleSubscribe(plan.priceId, plan.mode)}
                    className="bg-green-600 text-white"
                  >
                    {loadingPriceId === plan.priceId ? "Loading..." : "Get"}
            </Button>
          </div>
        
      </CardContent>
    </Card>
  ))}
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
