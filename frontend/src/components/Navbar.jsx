import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logos/CodeNexus.png'; // Replace with your logo path

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between px-8 h-[100px] bg-[#0f0e0e]"> {/* Adjusted height */}
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          className="h-[80px] w-auto object-contain" // Adjusted size for better balance
          alt="Logo"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-lg"> {/* Increased font size */}
        <Link className="text-white transition-all hover:text-blue-500" to="/">Home</Link>
        <Link className="text-white transition-all hover:text-blue-500" to="/about">About</Link>
        <Link className="text-white transition-all hover:text-blue-500" to="/services">Services</Link>
        <Link className="text-white transition-all hover:text-blue-500" to="/contact">Contact</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all" // Increased padding
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button (Hamburger Icon) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-white text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[100px] left-0 w-full bg-[#0f0e0e] text-white transition-all z-10 ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex flex-col items-center">
          <Link
            className="block px-8 py-2 hover:bg-blue-500 w-full text-center"
            to="/"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            Home
          </Link>
          <Link
            className="block px-8 py-2 hover:bg-blue-500 w-full text-center"
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            About
          </Link>
          <Link
            className="block px-8 py-2 hover:bg-blue-500 w-full text-center"
            to="/services"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            Services
          </Link>
          <Link
            className="block px-8 py-2 hover:bg-blue-500 w-full text-center"
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            Contact
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false); // Close menu before logging out
              handleLogout();
            }}
            className="block w-full px-8 py-2 hover:bg-red-600 text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
