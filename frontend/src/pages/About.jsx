import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="text-center mt-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white">
          Welcome to CodeNexus
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          CodeNexus is a streamlined development environment crafted to empower developers with the tools they need to code faster, smarter, and more securely. Whether you're working on personal projects or professional applications, CodeNexus has you covered.
        </p>

        {/* Our Mission Section */}
        <section className="mt-16">
          <h2 className="text-4xl font-semibold text-white">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            At CodeNexus, we are driven by the mission to make coding more accessible and productive. We aim to offer a no-nonsense, intuitive platform that helps developers write code with fewer errors, faster execution, and less complexity.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="mt-16">
          <h2 className="text-4xl font-semibold text-white">Core Values</h2>
          <ul className="mt-6 text-lg text-gray-300 list-disc list-inside max-w-2xl mx-auto leading-relaxed space-y-4">
            <li><strong>Practicality:</strong> Our tools are designed to directly enhance productivity without unnecessary distractions.</li>
            <li><strong>Efficiency:</strong> We prioritize speed and error-free coding to save you time and effort.</li>
            <li><strong>Security:</strong> Your code and data are safe with us.</li>
            <li><strong>User-Centric Design:</strong> We put developers first.</li>
          </ul>
        </section>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-4xl font-semibold text-white">Powerful Features</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CodeNexus is packed with features to streamline your workflow:
          </p>
          <ul className="mt-6 text-lg text-gray-300 list-disc list-inside max-w-2xl mx-auto space-y-4 leading-relaxed">
            <li><strong>Error Detection & Debugging:</strong> Instantly identify and resolve errors.</li>
            <li><strong>Intelligent Code Suggestions:</strong> Leverage AI-driven suggestions.</li>
            <li><strong>Enhanced Security:</strong> Protect your project with robust authentication systems.</li>
            <li><strong>Project Management:</strong> Organize your coding projects effortlessly.</li>
            <li><strong>Multi-Language Support:</strong> Work in Python, JavaScript, Java, C++, and C.</li>
            <li><strong>Customizable IDE:</strong> Tailor your coding environment to your liking.</li>
          </ul>
        </section>

        {/* Testimonials Section */}
        <section className="mt-16 bg-gray-800 py-12 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold text-white">What Our Users Say</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-300">
                "The interface is clean and easy to use. I don’t feel overwhelmed when I start a new project."
              </p>
              <p className="mt-4 text-sm font-bold text-gray-400">- Andrew Garfield</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-300">
                "I like how everything is organized. It’s straightforward and doesn’t require a lot of setup to get started."
              </p>
              <p className="mt-4 text-sm font-bold text-gray-400">- Henry Cavill</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-300">
                "It’s simple and does exactly what I need it to do. Perfect for personal projects."
              </p>
              <p className="mt-4 text-sm font-bold text-gray-400">- Shawn Mendes</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-300">
                "I’m new to coding, and this app helped me focus on writing code without getting lost in complicated tools."
              </p>
              <p className="mt-4 text-sm font-bold text-gray-400">- Harry Styles</p>
            </div>
          </div>
        </section>

        
{/* Getting Started Section */}
<section className="mt-16">
  <h2 className="text-4xl font-semibold text-white">Getting Started</h2>
  <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
    Getting started with CodeNexus is easy and straightforward. Here’s how you can begin:
  </p>
  <ol className="mt-6 text-lg text-gray-300 list-decimal list-inside max-w-2xl mx-auto space-y-4 leading-relaxed">
    <li>Visit the homepage to access all the features directly.</li>
    <li>Explore the clean and user-friendly interface designed for simplicity.</li>
    <li>Start creating and organizing your code projects without any hassle.</li>
    <li>Check out the resources and guides available to help you along the way.</li>
  </ol>
</section>

        {/* Call-to-Action */}
        <div className="mt-16">
          <a
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
