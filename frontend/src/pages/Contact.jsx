import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaGithub } from 'react-icons/fa'; // GitHub Icon
import logo from '../images/leetcode.png'; // Your custom LeetCode logo

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="text-center mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-400">
          We'd love to hear from you! If you have any questions, feedback, or need support, feel free to reach out.
        </p>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="mt-4 text-lg text-gray-400">
            Use the form below to send us a message or contact us through our social media platforms:
          </p>
        </section>

        <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-lg space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </form>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>
          <p className="mt-4 text-lg text-gray-400">
            You can also reach us through the following platforms:
          </p>
          <ul className="mt-6 flex flex-col items-center space-y-6 lg:space-y-0 lg:flex-row lg:gap-16 lg:justify-center">
            <li className="flex items-center space-x-3">
              <FaGithub className="text-blue-500 text-3xl hover:text-blue-600 transition-all" />
              <span className="flex flex-col items-start">
                <span className="font-semibold">GitHub Profile:</span>
                <a
                  href="https://github.com/ali-sorathiya64"
                  className="text-blue-500 hover:text-blue-600 hover:underline transition-all"
                >
                  ali-sorathiya64
                </a>
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaGithub className="text-blue-500 text-3xl hover:text-blue-600 transition-all" />
              <span className="flex flex-col items-start">
                <span className="font-semibold">GitHub Repo:</span>
                <a
                  href="https://github.com/ali-sorathiya64/Multi-code-IDE"
                  className="text-blue-500 hover:text-blue-600 hover:underline transition-all"
                >
                  Multi-code-IDE
                </a>
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <img
                src={logo}
                alt="LeetCode"
                className="h-7 w-7"
              />
              <span className="flex flex-col items-start">
                <span className="font-semibold">LeetCode:</span>
                <a
                  href="https://leetcode.com/StackedCoder/"
                  className="text-blue-500 hover:text-blue-600 hover:underline transition-all"
                >
                  StackedCoder
                </a>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Contact;
