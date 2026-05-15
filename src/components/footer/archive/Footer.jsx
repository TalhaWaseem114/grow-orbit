import React from "react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 relative overflow-hidden">
      {/* Background gradient circles for style */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 relative z-10">

        {/* About / Brand */}
        <div>
          <h3 className="text-white text-2xl font-bold mb-4">Grow Orbit</h3>
          <p className="text-gray-400 text-sm">
            Helping Amazon brands launch, optimize, and grow with stunning product visuals and conversion-driven strategies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-indigo-500 transition-colors duration-300">Home</a></li>
            <li><a href="/services" className="hover:text-indigo-500 transition-colors duration-300">Services</a></li>
            <li><a href="/portfolio" className="hover:text-indigo-500 transition-colors duration-300">Portfolio</a></li>
            <li><a href="/contact" className="hover:text-indigo-500 transition-colors duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact & Social</h4>
          <p className="text-gray-400 text-sm mb-4">
            Email: <a href="mailto:info@groworbit.com" className="hover:text-indigo-500 transition-colors duration-300">info@groworbit.com</a>
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 text-xl">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-indigo-500 transition transform hover:scale-110 duration-300 p-2 bg-gray-800 rounded-full shadow-md">
              <FaLinkedinIn />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-blue-500 transition transform hover:scale-110 duration-300 p-2 bg-gray-800 rounded-full shadow-md">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="hover:text-pink-500 transition transform hover:scale-110 duration-300 p-2 bg-gray-800 rounded-full shadow-md">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-800 pt-6 relative z-10">
        &copy; {new Date().getFullYear()} Grow Orbit. All rights reserved.
      </div>
    </footer>
  );
}
