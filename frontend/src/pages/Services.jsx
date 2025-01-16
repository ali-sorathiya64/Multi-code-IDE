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
                "Automatically detect errors and warnings in your code when you run it. Our IDE provides detailed error messages and suggestions to help you debug issues quickly and efficiently.",
            },
            {
              title: "Code Suggestions",
              description:
                "Receive intelligent code suggestions as you type. Our IDE helps you write more efficient and error-free code by offering suggestions and autocompletions.",
            },
            {
              title: "Authentication & Security",
              description:
                "Secure your projects with built-in authentication features. Manage user access and permissions to ensure your code remains protected.",
            },
            {
              title: "Project Management",
              description:
                "Save, update, and delete projects with ease. Our IDE provides a simple interface for managing your projects, allowing you to stay organized and efficient.",
            },
            {
              title: "Multi-language Support",
              description:
                "Work with multiple programming languages including Python, JavaScript, Java, and C++. Our IDE supports a diverse range of languages, ensuring a consistent coding experience.",
            },
            {
              title: "Customizable IDE Settings",
              description:
                "Adjust themes, syntax highlighting, and keyboard shortcuts to create a personalized coding environment tailored to your preferences.",
            },
            {
              title: "Save Your Project",
              description:
                "Keep your work safe and organized by saving your progress. With our easy-to-use project management features, you can save your code at any time.",
              buttonLabel: "Save",
              buttonColor: "bg-blue-500 hover:bg-blue-600",
            },
            {
              title: "Real-Time Collaboration",
              description:
                "Collaborate with team members in real-time. Share your code and work together on projects, making team development faster and more efficient.",
            },
            {
              title: "Delete Project",
              description:
                "Remove any project you no longer need. With our intuitive project management interface, you can delete projects with a single click.",
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
