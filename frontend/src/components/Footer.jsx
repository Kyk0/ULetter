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
  const handlePrintUserData = () => {
    const profileData = JSON.parse(localStorage.getItem("profileData")) || {};

    const printableContent = `
      <h1>User Data</h1>
      <p><strong>Username:</strong> ${profileData.username || "N/A"}</p>
      <p><strong>Email:</strong> ${profileData.email || "N/A"}</p>
      <p><strong>First Name:</strong> ${profileData.first_name || "N/A"}</p>
      <p><strong>Last Name:</strong> ${profileData.last_name || "N/A"}</p>
      <p><strong>Date Joined:</strong> ${
        profileData.date_joined
            ? new Date(profileData.date_joined).toLocaleString()
            : "N/A"
    }</p>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(printableContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
      <footer className="bg-gray-100 py-10 font-mono">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-8">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact</h3>
            <ul className="text-gray-600 space-y-2 font-medium">
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-purple-500" />
                Email:{" "}
                <a
                    href="mailto:support@uletter.com"
                    className="text-secondary hover:underline font-medium"
                >
                  support@uletter.com
                </a>
              </li>
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
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tools</h3>
            <ul className="text-gray-600 space-y-2 font-medium">
              <li>Message editor</li>
              <li>Styling tool</li>
            </ul>
          </div>
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
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
            <ul className="text-gray-600 space-y-2 font-medium">
              <li>
                <span className="font-bold text-purple-600">Mission:</span> To help
                users write impactful and professional letters effortlessly.
              </li>
              <li>
                <span className="font-bold text-purple-600">Core Features:</span>
                Letter creation, style rewriting, and feedback tools.
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <button
              onClick={handlePrintUserData}
              className="text-gray-500 hover:text-gray-700 transition"
          >
            Print Users' Data
          </button>
        </div>
      </footer>
  );
};

export default Footer;