import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="text-center mt-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold">Welcome to CodeNexus</h1>
        <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
          CodeNexus is a streamlined development environment crafted to empower developers with the tools they need to code faster, smarter, and more securely. We focus on simplicity, efficiency, and providing a top-tier user experience. Whether you're working on personal projects or professional applications, CodeNexus has you covered.
        </p>

        {/* Our Mission Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            At CodeNexus, we are driven by the mission to make coding more accessible and productive. We aim to offer a no-nonsense, intuitive platform that helps developers write code with fewer errors, faster execution, and less complexity.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold">Core Values</h2>
          <ul className="mt-6 text-lg text-gray-400 list-disc list-inside max-w-2xl mx-auto">
            <li><strong>Practicality:</strong> Our tools are designed to directly enhance productivity without unnecessary distractions.</li>
            <li><strong>Efficiency:</strong> We prioritize speed and error-free coding to save you time and effort.</li>
            <li><strong>Security:</strong> Your code and data are safe with us.</li>
            <li><strong>User-Centric Design:</strong> We put developers first.</li>
          </ul>
        </section>

        {/* Features Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold">Powerful Features</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            CodeNexus is packed with features to streamline your workflow:
          </p>
          <ul className="mt-6 text-lg text-gray-400 list-disc list-inside max-w-2xl mx-auto">
            <li><strong>Error Detection & Debugging:</strong> Instantly identify and resolve errors.</li>
            <li><strong>Intelligent Code Suggestions:</strong> Leverage AI-driven suggestions.</li>
            <li><strong>Enhanced Security:</strong> Protect your project with robust authentication systems.</li>
            <li><strong>Project Management:</strong> Organize your coding projects effortlessly.</li>
            <li><strong>Multi-Language Support:</strong> Work in Python, JavaScript, Java, C++, and C.</li>
            <li><strong>Customizable IDE:</strong> Tailor your coding environment to your liking.</li>
          </ul>
        </section>

        {/* Why Choose CodeNexus Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold">Why Choose CodeNexus?</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            CodeNexus is built for developers, by developers. We focus on practicality, efficiency, and security to help you stay productive and focused on writing great code.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
