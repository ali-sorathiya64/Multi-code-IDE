import React from 'react';
import Navbar from '../components/Navbar';

const Services = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-white">Our Services</h1>
        <p className="mt-4 text-xl text-gray-400">
          Our IDE offers essential features to enhance your coding experience. Here’s what we provide:
        </p>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Error Detection & Debugging</h2>
          <p className="mt-4 text-lg text-gray-400">
            Automatically detect errors and warnings in your code when you run it. Our IDE provides detailed error messages and suggestions to help you debug issues quickly and efficiently. This feature helps you identify syntax errors, logical errors, and runtime errors, making the debugging process smoother and less time-consuming.
          </p>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Code Suggestions</h2>
          <p className="mt-4 text-lg text-gray-400">
            Receive intelligent code suggestions as you type. Our IDE helps you write more efficient and error-free code by offering suggestions and autocompletions. These suggestions are based on common coding patterns and best practices, ensuring that you adhere to coding standards and improve your overall code quality.
          </p>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Authentication & Security</h2>
          <p className="mt-4 text-lg text-gray-400">
            Secure your projects with built-in authentication features. Manage user access and permissions to ensure your code remains protected. Our authentication system supports multiple authentication methods, including password-based authentication and OAuth, providing a flexible and secure way to manage user access.
          </p>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Project Management</h2>
          <p className="mt-4 text-lg text-gray-400">
            Save, update, and delete projects with ease. Our IDE provides a simple interface for managing your projects, allowing you to stay organized and efficient. You can create new projects, update existing project details, and delete projects that are no longer needed, all from within the IDE.
          </p>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Multi-language Support</h2>
          <p className="mt-4 text-lg text-gray-400">
            Work with multiple programming languages including Python, JavaScript, Java, C++, SQL, and more. Our IDE supports a diverse range of languages, allowing you to tackle various projects without switching tools. This multi-language support ensures that you have a consistent coding experience regardless of the language you are using.
          </p>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Customizable IDE Settings</h2>
          <p className="mt-4 text-lg text-gray-400">
            Adjust themes, syntax highlighting, and keyboard shortcuts to create a personalized coding environment. Our IDE offers a range of customization options that allow you to tailor the interface and functionality to your preferences, enhancing your productivity and comfort while coding.
          </p>
        </section>
        
      </div>
    </div>
  );
};

export default Services;
