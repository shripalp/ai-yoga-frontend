import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
                style={{ backgroundImage: "url('/yoga-classes.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-white px-6 md:px-12">
                    <h1 className="text-4xl md:text-6xl font-bold">Get in Touch</h1>
                    <p className="mt-4 text-lg md:text-xl">We’d love to hear from you! Contact us for any inquiries.</p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="container mx-auto px-6 py-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Our Contact Details</h2>
                <p className="text-gray-600 mt-4">Reach out to us anytime – we're here to help.</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Email */}
                    <Card className="shadow-lg">
                        <CardContent className="p-6 flex flex-col items-center">
                            <Mail className="text-blue-600 w-10 h-10" />
                            <h3 className="text-xl font-semibold mt-4">Email</h3>
                            <p className="text-gray-600 mt-2">info@thirdlimbyoga.com</p>
                        </CardContent>
                    </Card>

                    {/* Phone */}
                    <Card className="shadow-lg">
                        <CardContent className="p-6 flex flex-col items-center">
                            <Phone className="text-green-600 w-10 h-10" />
                            <h3 className="text-xl font-semibold mt-4">Phone</h3>
                            <p className="text-gray-600 mt-2">+1 (123) 456-7890</p>
                        </CardContent>
                    </Card>

                    {/* Location */}
                    <Card className="shadow-lg">
                        <CardContent className="p-6 flex flex-col items-center">
                            <MapPin className="text-red-600 w-10 h-10" />
                            <h3 className="text-xl font-semibold mt-4">Location</h3>
                            <p className="text-gray-600 mt-2">123 Yoga Street, Calgary, Canada</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Contact Form */}
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Send Us a Message</h2>
                <p className="text-gray-600 mt-4 text-center">Fill out the form below, and we’ll get back to you soon.</p>

                <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                        Send Message
                    </Button>
                </form>
            </div>

            {/* Google Map */}
            <div className="container mx-auto px-6 py-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Find Us on the Map</h2>
                <div className="mt-6">
                    <iframe
                        className="w-full h-80 rounded-lg shadow-lg"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23752.482184497768!2d-114.0718832!3d51.0447335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170038bf9db9b%3A0xe0eb1c4e9f4d6ae6!2sCalgary%2C+Canada!5e0!3m2!1sen!2sca!4v1618276311613!5m2!1sen!2sca"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
