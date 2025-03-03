import { Button } from "@/components/ui/button";
import { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    const serviceID = "service_uhna8sw"; // Replace with your EmailJS Service ID
    const templateID = "template_gyix61x"; // Replace with your EmailJS Template ID
    const userID = "T9_owlQThsPzUx2yP"; // Replace with your EmailJS User ID (found in account settings)

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
        alert("Message sent! We will get back to you soon.");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send message. Please try again later.");
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Send Us a Message
        </h2>
        <p className="text-gray-600 mt-4 text-center">
          Fill out the form below, and we’ll get back to you soon.
        </p>

        {isSent && (
          <p className="text-green-600 text-center mt-4">
            ✅ Your message has been sent!
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        >
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
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
