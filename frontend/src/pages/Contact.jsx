import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaGithub } from "react-icons/fa"; // GitHub Icon
import logo from "../images/leetcode.png"; // Your custom LeetCode logo

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="text-center mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-400">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-400">
          We'd love to hear from you! If you have any questions, feedback, or need support, feel free to reach out.
        </p>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 mx-auto max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-green-400 text-center">Send Us a Message</h2>
          <div className="mt-6 space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-400">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </form>

        {/* Special Links Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-yellow-400 text-center">Other Ways to Reach Us</h2>
          <p className="mt-4 text-lg text-gray-400 text-center">
            Connect with us on these platforms for additional resources and updates:
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {/* GitHub Profile Card */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transition-all">
              <FaGithub className="text-blue-500 text-5xl mx-auto" />
              <h3 className="text-xl font-semibold text-white mt-4 text-center">GitHub Profile</h3>
              <p className="mt-2 text-gray-400 text-center">
                Explore our repositories and follow our projects.
              </p>
              <a
                href="https://github.com/ali-sorathiya64"
                className="mt-4 block text-center text-blue-500 hover:text-blue-600 hover:underline transition-all"
              >
                ali-sorathiya64
              </a>
            </div>

            {/* GitHub Repo Card */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transition-all">
              <FaGithub className="text-blue-500 text-5xl mx-auto" />
              <h3 className="text-xl font-semibold text-white mt-4 text-center">GitHub Repo</h3>
              <p className="mt-2 text-gray-400 text-center">
                Check out the Multi-code-IDE repository for our latest project.
              </p>
              <a
                href="https://github.com/ali-sorathiya64/Multi-code-IDE"
                className="mt-4 block text-center text-blue-500 hover:text-blue-600 hover:underline transition-all"
              >
                Multi-code-IDE
              </a>
            </div>

            {/* LeetCode Card */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transition-all">
              <img src={logo} alt="LeetCode" className="h-10 w-10 mx-auto" />
              <h3 className="text-xl font-semibold text-white mt-4 text-center">LeetCode Profile</h3>
              <p className="mt-2 text-gray-400 text-center">
                Solve coding challenges and see our solutions.
              </p>
              <a
                href="https://leetcode.com/StackedCoder/"
                className="mt-4 block text-center text-blue-500 hover:text-blue-600 hover:underline transition-all"
              >
                StackedCoder
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
