import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-white">About Code IDE</h1>
        <p className="mt-4 text-xl text-gray-400">
          Welcome to Code IDE! Our goal is to provide a practical and efficient coding environment for developers. We focus on essential features that make coding easier and more productive.
        </p>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-400">
            Our mission is to support developers in writing better code by offering tools that simplify and enhance the coding process. We aim to provide a straightforward platform that addresses everyday coding needs without unnecessary complexity.
          </p>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Our Values</h2>
          <ul className="mt-4 text-lg text-gray-400 list-disc list-inside">
            <li>Practicality: We focus on providing useful features that directly benefit developers.</li>
            <li>Efficiency: Our tools are designed to help you code faster and with fewer errors.</li>
            <li>Security: Protecting your code and data is our top priority.</li>
            <li>User-Friendliness: We strive to create an interface that is easy to use and intuitive.</li>
          </ul>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Our Features</h2>
          <p className="mt-4 text-lg text-gray-400">
            Code IDE offers a range of features designed to improve your coding experience:
          </p>
          <ul className="mt-4 text-lg text-gray-400 list-disc list-inside">
            <li><strong>Error Detection & Debugging:</strong> Automatically detect errors and warnings when you run your code. Receive detailed error messages to help you quickly find and fix issues.</li>
            <li><strong>Code Suggestions:</strong> Get intelligent code suggestions as you type. This feature helps you write more efficient and error-free code by offering helpful suggestions and autocompletions.</li>
            <li><strong>Authentication & Security:</strong> Secure your projects with built-in authentication. Manage user access to keep your code protected and maintain control over who can make changes.</li>
            <li><strong>Project Management:</strong> Easily save, update, and delete projects. Our interface makes it simple to manage your work and stay organized.</li>
            <li><strong>Multi-language Support:</strong> Work with multiple programming languages including Python, JavaScript, Java, C++, SQL, and more. Enjoy a consistent coding experience across different languages.</li>
            <li><strong>Customizable IDE Settings:</strong> Personalize your coding environment with customizable themes, syntax highlighting, and keyboard shortcuts. Adjust settings to match your preferences and improve productivity.</li>
          </ul>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Why Choose Us?</h2>
          <p className="mt-4 text-lg text-gray-400">
            Code IDE is built for developers who value practicality and efficiency. Our features are designed to help you focus on coding without getting bogged down by unnecessary tools. We prioritize user experience, security, and support for multiple languages to create a coding environment that works for you.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
