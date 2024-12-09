import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUserTie,
  faGraduationCap,
  faUsers,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const Home = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [typedTitle, setTypedTitle] = useState("");
  const titleText = "Write, Edit, and Perfect Your Letter";

  useEffect(() => {
    let index = 0;
    const typeEffect = setInterval(() => {
      setTypedTitle(titleText.slice(0, index + 1));
      index++;
      if (index >= titleText.length) clearInterval(typeEffect);
    }, 100);
    return () => clearInterval(typeEffect);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomRow = Math.floor(Math.random() * keyboardRows.length);
      const randomKey =
        keyboardRows[randomRow][
          Math.floor(Math.random() * keyboardRows[randomRow].length)
        ];
      setActiveKey(randomKey);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 font-mono via-gray-100 to-gray-200">
      {/* Hero Section */}
      <section
  className="relative py-24 text-center text-white"
  style={{
    background: `radial-gradient(circle at top, #1a237e, #4a148c 50%, #7e57c2)`,
    height: "80vh",
    zIndex: 1,
  }}
>
  <div className="relative z-10 flex flex-col items-center justify-center h-full">
    {/* Envelope Icon */}
    <FontAwesomeIcon
      icon={faEnvelope}
      className="text-6xl text-indigo-300 mb-4 animate-bounce"
    />
    {/* Main Headline with Typing Effect */}
    <h1 className="text-5xl font-extrabold tracking-wide mb-6">
      {typedTitle || ""}
    </h1>
    <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-200">
      Use <span className="font-bold text-white">ULetter</span> to rewrite
      letters in various styles, generate new ones with specific topics, or get
      feedback on your drafts to improve them.
    </p>
    {/* Animated Keyboard */}
    <div className="bg-gray-900 rounded-lg shadow-lg p-4">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-2 mb-2">
          {row.map((key) => (
            <div
              key={key}
              className={`w-10 h-10 flex items-center justify-center text-white text-lg font-bold rounded ${
                activeKey === key ? "bg-indigo-500 animate-bounce" : "bg-gray-700"
              }`}
              style={{
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Features Section */}
<section
  className="py-16 mx-auto w-full rounded-lg shadow-lg"
  style={{
    background: "linear-gradient(135deg, #DAD9E8, #B8D6E5)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  }}
>
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-6">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Rewrite Letters</h3>
        <p className="text-gray-600">
          Rewrite your letters with various styles such as brief, slang, or professional.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Write from Scratch</h3>
        <p className="text-gray-600">
          Create letters from scratch by specifying the topic and style you want.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Adoption of Writing Style</h3>
        <p className="text-gray-600">
          Train the app to adopt your writing style for future letters.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Get Feedback</h3>
        <p className="text-gray-600">
          Upload drafts and receive feedback and suggestions for improvements.
        </p>
      </div>
    </div>
  </div>
</section>


{/* How It Works Section */}
<section
  className="py-16 mx-auto w-full rounded-lg shadow-lg"
  style={{
    background: "linear-gradient(135deg, #5B3E96, #2B5876)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  }}
>
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-white text-center mb-10">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:shadow-xl transition duration-300">
        <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl mb-4 mx-auto">1</div>
        <h3 className="text-xl font-bold text-gray-700 text-center mb-2">Sign Up</h3>
        <p className="text-gray-600 text-center">
          Create your account by providing your name, email, and a secure password.
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:shadow-xl transition duration-300">
        <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl mb-4 mx-auto">2</div>
        <h3 className="text-xl font-bold text-gray-700 text-center mb-2">Choose a Tool</h3>
        <p className="text-gray-600 text-center">
          Select from rewriting, drafting, feedback, or tone adjustment tools.
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:shadow-xl transition duration-300">
        <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl mb-4 mx-auto">3</div>
        <h3 className="text-xl font-bold text-gray-700 text-center mb-2">Customize</h3>
        <p className="text-gray-600 text-center">
          Set the tone, style, and structure of your letter.
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:shadow-xl transition duration-300">
        <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl mb-4 mx-auto">4</div>
        <h3 className="text-xl font-bold text-gray-700 text-center mb-2">Save & Share</h3>
        <p className="text-gray-600 text-center">
          Download your letter or share it directly via email or social platforms.
        </p>
      </div>
    </div>
  </div>
</section>




{/* Who Can Use This App */}
<section
  className="py-16 mx-auto w-full rounded-lg shadow-lg"
  style={{
    background: "linear-gradient(135deg, #D8CCE5, #BFDCE5)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  }}
>
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-10">Who Can Use This App</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-lg transition duration-300">
        <FontAwesomeIcon
          icon={faUserTie}
          className="text-5xl text-blue-500 mb-4 hover:animate-spin"
        />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Professionals</h3>
        <p className="text-gray-600">
          Perfect for writing emails, cover letters, reports, and formal communication.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-lg transition duration-300">
        <FontAwesomeIcon
          icon={faGraduationCap}
          className="text-5xl text-purple-500 mb-4 hover:animate-bounce"
        />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Students</h3>
        <p className="text-gray-600">
          Excellent for writing essays, assignments, and official communication with educators.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-lg transition duration-300">
        <FontAwesomeIcon
          icon={faUsers}
          className="text-5xl text-green-500 mb-4 hover:animate-pulse"
        />
        <h3 className="text-xl font-bold text-gray-800 mb-2">General Users</h3>
        <p className="text-gray-600">
          Anyone looking to enhance their communication with better-written content.
        </p>
      </div>
    </div>
  </div>
</section>


{/* Why Choose ULetter? */}
<section
  className="py-16 mx-auto w-full rounded-lg shadow-lg"
  style={{
    background: "linear-gradient(135deg, #4E4376, #2B5876)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  }}
>
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-white mb-8 text-center">
      <FontAwesomeIcon icon={faCheckCircle} className="text-purple-300 mr-3" />
      Why Choose ULetter?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 shadow-lg rounded-lg transform transition-all hover:scale-105 active:translate-y-1">
        <h3 className="text-xl font-bold text-purple-700 mb-4">User-Centric Design</h3>
        <p className="text-gray-600 leading-relaxed">
          Every feature is designed with the user in mind, ensuring a smooth and intuitive experience.
        </p>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg transform transition-all hover:scale-105 active:translate-y-1">
        <h3 className="text-xl font-bold text-purple-700 mb-4">Continuous Improvement</h3>
        <p className="text-gray-600 leading-relaxed">
          Regular updates based on user feedback and emerging technologies.
        </p>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg transform transition-all hover:scale-105 active:translate-y-1">
        <h3 className="text-xl font-bold text-purple-700 mb-4">Collaboration-Driven</h3>
        <p className="text-gray-600 leading-relaxed">
          Built by a team with a shared vision for improving written communication.
        </p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;