import React from 'react';
import Navbar from '../components/Navbar';

const Services = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="text-center mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white">Our Services</h1>
        <p className="mt-4 text-xl text-gray-300 max-w-4xl mx-auto">
          Our IDE offers essential features to enhance your coding experience. Here’s what we provide:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          {/* Service Items */}
          {[
            {
              title: "Error Detection & Debugging",
              description:
                "Automatically detect errors and warnings in your code as you work. Our IDE highlights issues, provides detailed error messages, and offers suggestions to help you debug effectively.",
            },
            {
              title: "Code Suggestions",
              description:
                "Write code faster with intelligent suggestions. Our IDE assists with autocompletion, function hints, and syntax improvements, reducing manual effort.",
            },
            {
              title: "Authentication & Security",
              description:
                "Protect your projects with built-in authentication. Manage user access and ensure your data is secure with robust security protocols.",
            },
            {
              title: "Project Management",
              description:
                "Stay organized by managing multiple projects effortlessly. Save, update, rename, and delete projects directly within the IDE.",
            },
            {
              title: "Multi-language Support",
              description:
                "Code in your preferred language. Our IDE supports Python, JavaScript, Java, C++, and more, making it suitable for diverse projects.",
            },
            {
              title: "Customizable IDE Settings",
              description:
                "Personalize your coding environment with custom themes, syntax highlighting, and keyboard shortcuts to suit your preferences.",
            },
            {
              title: "Save Your Project",
              description:
                "Save your progress anytime and access it later with ease. Never worry about losing your work again.",
              buttonLabel: "Save",
              buttonColor: "bg-blue-500 hover:bg-blue-600",
            },
            {
              title: "Real-Time Collaboration",
              description:
                "Collaborate seamlessly with team members in real-time. Share your projects and work together to achieve better results.",
            },
            {
              title: "Delete Project",
              description:
                "Clean up your workspace by removing unnecessary projects. A simple and efficient way to stay organized.",
              buttonLabel: "Delete",
              buttonColor: "bg-red-500 hover:bg-red-600",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
              <p className="mt-4 text-lg text-gray-300">{service.description}</p>
              {service.buttonLabel && (
                <button
                  className={`mt-6 px-6 py-2 ${service.buttonColor} text-white rounded-lg transition-all`}
                >
                  {service.buttonLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;