import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 font-mono">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-8">
        {/* Contact Column */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Contact</h3>
          <ul className="text-gray-600 space-y-2 font-medium">
          <p>
              Email:{" "}
              <a
                href="mailto:support@uletter.com"
                className="text-secondary hover:underline font-medium"
              >
                support@uletter.com
              </a>
            </p>
            <li>
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-purple-500" />
              Phone: +370 234 567 890
            </li>
            <li>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-2 text-purple-500"
              />
              Address: 1234 ULetter St, Kaunas, Lithuania
            </li>
          </ul>
        </div>

        {/* Tools Column */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Tools</h3>
          <ul className="text-gray-600 space-y-2 font-medium">
            <li>Message editor</li>
            <li>Styling tool</li>
          </ul>
        </div>

        {/* Resources Column */}
<div className="flex flex-col">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Resources</h3>
  <ul className="text-gray-600 space-y-2 font-medium">
    <li>
      <a
        href="https://www.grammarly.com/blog/writing-tips/how-to-write-a-letter/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out"
      >
        Blog
      </a>
    </li>
    <li>
      <a
        href="https://piktochart.com/blog/how-to-write-case-study/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out"
      >
        Case Study
      </a>
    </li>
    <li>
      <a
        href="https://www.cdc.gov/nceh/clearwriting/docs/Case_Study_Guide-H.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out"
      >
        Documentation
      </a>
    </li>
  </ul>
</div>


        {/* Competitors Column */}
<div className="flex flex-col">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Competitors</h3>
  <ul className="text-gray-600 space-y-2 font-medium">
    <li>
      <a
        href="https://www.typli.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out"
      >
        typli
      </a>
    </li>
    <li>
      <a
        href="https://toolbaz.com"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out"
      >
        ToolBaz
      </a>
    </li>
    <li>
      <a
        href="https://hirequotient.com"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out"
      >
        HireQuotient
      </a>
    </li>
    <li>
      <a
        href="https://www.grammarly.com"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out"
      >
        Grammarly
      </a>
    </li>
    <li>
      <a
        href="https://writingmate.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out"
      >
        ChatLabs
      </a>
    </li>
  </ul>
</div>

        {/* About Column */}
<div className="flex flex-col">
  <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
  <ul className="text-gray-600 space-y-2 font-medium">
    <li>
      <span className="font-bold text-purple-600">Mission:</span> To help users
      write impactful and professional letters effortlessly.
    </li>
    <li>
      <span className="font-bold text-purple-600">Core Features:</span> Letter
      creation, style rewriting, and feedback tools.
    </li>
  </ul>
</div>

      </div>

      {/* Social Media and Copyright */}
      <div className="border-t mt-10 pt-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6">
          <p className="text-gray-600 text-sm font-medium">
            &copy; 2024 ULetter. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 transition"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;