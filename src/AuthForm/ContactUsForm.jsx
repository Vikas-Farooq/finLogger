import React, { useState } from "react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form Data:", formData);

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you shortly.",
      confirmButtonColor: "#2563EB", // Tailwind blue-600
    });

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Have any questions or feedback? Fill out the form below and we’ll
          respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          We value your privacy. Your information will remain confidential.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
