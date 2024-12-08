import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMapMarkerAlt,
  faClock,
  faEnvelope,
  faCalendarAlt,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback: "${feedback}"`);
    setFeedback("");
    setShowFeedbackForm(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #6ab0de, #805ea6)", // Main Page Gradient Background
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="bg-background text-text max-w-4xl mx-auto p-8 rounded-lg shadow-lg border border-gray-200 mt-8"
        style={{
          backgroundImage: `url('photo_2024-12-08_19-06-46.jpg')`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

        {/* Contact Information Section */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-2xl font-semibold text-primary border-b pb-2 mb-4">
            Contact Information
          </h2>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-primary text-xl mr-4"
            />
            <p>
              Email:{" "}
              <a
                href="mailto:support@uletter.com"
                className="text-secondary hover:underline font-medium"
              >
                support@uletter.com
              </a>
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-primary text-xl mr-4"
            />
            <p>Phone: +370 234 567 890</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-primary text-xl mr-4"
            />
            <p>Address: 1234 ULetter St, Kaunas, Lithuania</p>
          </div>
        </div>

        {/* Support Details Section */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-2xl font-semibold text-primary border-b pb-2 mb-4">
            Support Details
          </h2>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon
              icon={faClock}
              className="text-primary text-xl mr-4"
            />
            <p>Working Hours: Mon-Fri, 9:00 AM - 5:00 PM</p>
          </div>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-primary text-xl mr-4"
            />
            <p>Holiday Schedule: Limited support on public holidays</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faStopwatch}
              className="text-primary text-xl mr-4"
            />
            <p>Estimated Response Time: Within 24 hours (on business days)</p>
          </div>
        </div>

        {/* Connect With Us Section */}
        <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-2xl font-semibold text-primary border-b pb-2 mb-4">
            Connect With Us
          </h2>
          <div className="flex gap-4">
            <a
              href="https://facebook.com/uletter"
              className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} className="mr-2" />
              Facebook
            </a>
            <a
              href="https://twitter.com/uletter"
              className="flex items-center justify-center bg-blue-400 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="mr-2" />
              Twitter
            </a>
            <button
              className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded shadow hover:bg-secondary transition"
              onClick={() => setShowFeedbackForm(!showFeedbackForm)}
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Feedback
            </button>
          </div>
        </div>

        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="p-6 bg-gray-50 rounded-lg shadow border border-gray-200 mt-4">
            <h3 className="text-xl font-bold mb-4 text-primary">
              We value your feedback
            </h3>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                className="w-full p-3 rounded border border-gray-300 mb-4 resize-none"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white font-bold rounded shadow hover:bg-secondary transition"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact
