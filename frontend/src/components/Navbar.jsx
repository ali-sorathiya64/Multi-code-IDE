import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logos/white.png'; // Replace with your logo path

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between px-8 h-[80px] bg-[#0f0e0e]">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          className="h-[50px] max-h-[60px] w-auto object-contain" // Adjust size
          alt="Logo"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-base">
        <Link className="text-white transition-all hover:text-blue-500" to="/">Home</Link>
        <Link className="text-white transition-all hover:text-blue-500" to="/about">About</Link>
        <Link className="text-white transition-all hover:text-blue-500" to="/services">Services</Link>
        <Link className="text-white transition-all hover:text-blue-500" to="/contact">Contact</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600 transition-all"
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
      <div className={`md:hidden absolute top-[80px] left-0 w-full bg-[#0f0e0e] text-white transition-all ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center">
          <Link className="block px-8 py-2 hover:bg-blue-500" to="/">Home</Link>
          <Link className="block px-8 py-2 hover:bg-blue-500" to="/about">About</Link>
          <Link className="block px-8 py-2 hover:bg-blue-500" to="/services">Services</Link>
          <Link className="block px-8 py-2 hover:bg-blue-500" to="/contact">Contact</Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-8 py-2 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
