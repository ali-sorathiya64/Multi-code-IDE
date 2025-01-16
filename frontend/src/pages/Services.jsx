import React from 'react';
import Navbar from '../components/Navbar';

const Services = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="text-center mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-400">Our Services</h1>
        <p className="mt-4 text-xl text-gray-400 max-w-4xl mx-auto">
          Our IDE offers essential features to enhance your coding experience. Here’s what we provide:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
          {/* Service Items */}
          {[
            {
              title: "Error Detection & Debugging",
              description:
                "Automatically detect errors and warnings in your code when you run it. Our IDE provides detailed error messages and suggestions to help you debug issues quickly and efficiently.",
              color: "text-red-400",
            },
            {
              title: "Code Suggestions",
              description:
                "Receive intelligent code suggestions as you type. Our IDE helps you write more efficient and error-free code by offering suggestions and autocompletions.",
              color: "text-green-400",
            },
            {
              title: "Authentication & Security",
              description:
                "Secure your projects with built-in authentication features. Manage user access and permissions to ensure your code remains protected.",
              color: "text-yellow-400",
            },
            {
              title: "Project Management",
              description:
                "Save, update, and delete projects with ease. Our IDE provides a simple interface for managing your projects, allowing you to stay organized and efficient.",
              color: "text-blue-400",
            },
            {
              title: "Multi-language Support",
              description:
                "Work with multiple programming languages including Python, JavaScript, Java, and C++. Our IDE supports a diverse range of languages, ensuring a consistent coding experience.",
              color: "text-purple-400",
            },
            {
              title: "Customizable IDE Settings",
              description:
                "Adjust themes, syntax highlighting, and keyboard shortcuts to create a personalized coding environment tailored to your preferences.",
              color: "text-pink-400",
            },
            {
              title: "Save Your Project",
              description:
                "Keep your work safe and organized by saving your progress. With our easy-to-use project management features, you can save your code at any time.",
              color: "text-cyan-400",
            },
            {
              title: "Real-Time Collaboration",
              description:
                "Collaborate with team members in real-time. Share your code and work together on projects, making team development faster and more efficient.",
              color: "text-teal-400",
            },
            {
              title: "Delete Project",
              description:
                "Remove any project you no longer need. With our intuitive project management interface, you can delete projects with a single click.",
              color: "text-red-400",
            },
           
          ].map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h2 className={`text-2xl font-semibold ${service.color}`}>
                {service.title}
              </h2>
              <p className="mt-4 text-lg text-gray-400">{service.description}</p>
              {["Save Your Project", "Delete Project", "Theme Customization"].includes(service.title) ? (
                <button
                  className={`mt-6 px-6 py-2 ${
                    service.title === "Save Your Project"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : service.title === "Delete Project"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white rounded-lg transition-all`}
                >
                  {service.title === "Theme Customization" ? "Customize Theme" : service.title.split(" ")[0]}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
