import React, { useState } from 'react';
import Navbar from '../components/Navbar';

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
    <div>
      <Navbar />
      <div className="text-center mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-400">
          We'd love to hear from you! If you have any questions, feedback, or need support, feel free to reach out.
        </p>

        <section className="mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>
          <p className="mt-4 text-lg text-gray-400">
            Use the form below to send us a message or contact us through our social media platforms:
          </p>
        </section>

        <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-md space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-800 text-white"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-gray-800 text-white"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 rounded-md bg-gray-800 text-white"
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
          <h2 className="text-2xl font-semibold text-white">Other Ways to Reach Us</h2>
          <p className="mt-4 text-lg text-gray-400">
            You can also reach us through the following platforms:
          </p>
          <ul className="mt-4 text-lg text-gray-400 list-disc list-inside">
          
            <li>GitHub: <a href="https://github.com/ali-sorathiya64" className="text-blue-500 hover:underline">ali-sorathiya64</a></li>
            <li>LeetCode: <a href="https://leetcode.com/u/StackedCoder/" className="text-blue-500 hover:underline">StackedCoder</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Contact;
