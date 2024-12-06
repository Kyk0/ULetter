import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Write, Edit, and Perfect Your Letters";
  const navigate = useNavigate();

  // Typing effect logic
  useEffect(() => {
    let index = 0;
    const typeEffect = setInterval(() => {
      setTypedText((prev) => fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(typeEffect);
    }, 100);
    return () => clearInterval(typeEffect);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative py-24 text-center text-white"
        style={{
          background: "linear-gradient(to bottom, #005A8D, #0087CA)",
          height: "80vh",
          zIndex: 1,
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-6xl text-indigo-300 mb-6 animate-bounce"
          />
          <h1 className="text-5xl font-extrabold tracking-wide mb-6">
            {typedText || "..."}
          </h1>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-200">
            Use <span className="font-bold text-white">ULetter</span> to rewrite
            letters in various styles, generate new ones with specific topics,
            or get feedback on your drafts to improve them.
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => navigate("/signin?type=signup")}
              className="bg-blue-500 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/signin?type=login")}
              className="bg-gray-400 text-gray-800 px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-gray-500 transition"
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 bg-gray-50 relative"
        style={{ marginTop: "-50px", zIndex: 0 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 transform transition hover:scale-105">
              <h3 className="text-xl font-bold text-gray-700">Rewrite Letters</h3>
              <p className="text-gray-600 mt-2">
                Rewrite your letters with various styles such as brief, slang, or
                professional.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 transform transition hover:scale-105">
              <h3 className="text-xl font-bold text-gray-700">Write from Scratch</h3>
              <p className="text-gray-600 mt-2">
                Create letters from scratch by specifying the topic and style you
                want.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 transform transition hover:scale-105">
              <h3 className="text-xl font-bold text-gray-700">Adopt Writing Style</h3>
              <p className="text-gray-600 mt-2">
                Train the app to adopt your writing style for future letters.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white shadow-lg rounded-lg p-6 transform transition hover:scale-105">
              <h3 className="text-xl font-bold text-gray-700">Get Feedback</h3>
              <p className="text-gray-600 mt-2">
                Upload drafts and receive feedback and suggestions for
                improvements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
