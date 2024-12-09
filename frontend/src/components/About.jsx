import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faCode,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const teamMembers = [
    { name: "Kyk0", roles: ["Development Team", "Quality Assurance (QA)"], photo: "photo_2024-12-08_05-48-59.jpg" },
    { name: "FlashLLan", roles: ["Development Team", "Quality Assurance (QA)"], photo: "photo_2024-12-08_19-27-18.jpg" },
    { name: "arseniia02", roles: ["Development Team", "Design Team"], photo: "photo_2024-12-08_05-57-17.jpg" },
    { name: "nesrtvld", roles: ["Development Team", "Design Team"], photo: "photo_2024-12-08_16-16-37.jpg" },
    { name: "yuliialuhutsenko", roles: ["Content Team", "Quality Assurance (QA)"], photo: "photo_2024-12-08_18-07-40.jpg" },
    { name: "SeaOfWater", roles: ["Content Team", "Quality Assurance (QA)"], photo: "photo_2024-12-08_05-49-21.jpg" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 font-mono via-gray-100 to-gray-200">
      <section className="py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-gray-50 w-full">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 pr-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          About the Project
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed text-justify">
  Welcome to <span className="text-blue-600 font-semibold">ULetter</span>, your comprehensive solution for enhancing your written communication. Whether you're a professional working on critical documents, a student perfecting essays, or someone drafting personal letters, ULetter empowers you to achieve clarity and precision. Our platform is dedicated to simplifying the writing process, ensuring your messages are effective and impactful. Let us be your trusted partner in writing with confidence and ease.
</p>
 {/* Separator Line */}
 <div className="relative mt-6 mb-4">
      <div
        className="h-1 w-full bg-white opacity-50 rounded-lg"
        style={{ filter: "blur(2px)" }}
      ></div>
    </div>
        <ul className="list-disc list-inside text-lg text-gray-700 mt-4 space-y-1 text-justify">
          <li>Rewrite your letters in specific styles, such as concise, slang, or professional.</li>
          <li>Compose letters from scratch by specifying a subject and tone.</li>
          <li>Learn and adapt to your writing style for future communications.</li>
          <li>Upload drafts to receive actionable feedback and recommendations for improvement.</li>
        </ul>
      </div>
      <div className="w-full md:w-1/2">
        <img
          src="how-to-write-a-letter-to-the-editor.jpg"
          alt="About the project"
          className="w-70 h-95 object-cover rounded-lg shadow-lg ml-8"
        />
      </div>
    </div>
  </div>
</section>

     {/* Project Highlights */}
     <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-50 w-full">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left Section */}
      <div>
        <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center">
          <FontAwesomeIcon icon={faCode} className="text-teal-600 mr-3" />
          Project Highlights
        </h2>
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Collaborative Effort
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            A multidisciplinary team of developers, designers, and content
            strategists collaborated to deliver a seamless and user-friendly
            experience.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Advanced Technologies
          </h3>
          <ul className="text-lg text-gray-700 leading-relaxed space-y-2 list-disc ml-6 text-justify">
            <li>
              <strong>Frontend:</strong> React.js for dynamic, responsive, and
              user-friendly interfaces.
            </li>
            <li>
              <strong>Backend:</strong> Django for robust backend logic and
              efficient server-side processing.
            </li>
            <li>
              <strong>Styling:</strong> Tailwind CSS for modern and
              consistent design.
            </li>
            <li>
              <strong>API Integration:</strong> Django REST Framework (DRF) for
              seamless and secure API development.
            </li>
            <li>
              <strong>Database:</strong> SQLite for local development and
              Django ORM for efficient database management and scalability.
            </li>
          </ul>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex justify-center">
        <img
          src="1663764430142.png" 
          alt="Robot with lightbulb"
          className="w-85 h-85 object-cover rounded-lg shadow-lg ml-8"
        />
      </div>
    </div>
  </div>
</section>


      {/* Future Outlook */}
      <section className="py-16 w-full bg-gradient-to-b from-purple-50 via-purple-100 to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Section */}
            <div className="w-full md:w-1/2 pr-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 font-custom">
                Future Outlook
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4 font-custom text-justify">
                At ULetter, innovation drives our mission to continuously improve how
                people communicate through written content. We are committed to expanding
                our platform's capabilities with advanced technologies and new features.
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 font-custom text-justify">
                <li>
                  <strong>AI-Powered Grammar and Style Checker:</strong> Providing instant
                  corrections and suggestions to refine your writing.
                </li>
                <li>
                  <strong>Interactive Writing Assistant:</strong> Offering real-time feedback
                  as you draft content.
                </li>
                <li>
                  <strong>Plagiarism Detection Tool:</strong> Ensuring originality and
                  authenticity in every piece.
                </li>
                <li>
                  <strong>Cross-Language Support:</strong> Bridging the gap between
                  languages for seamless communication.
                </li>
              </ul>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="photo_2024-12-08_05-16-26.jpg"
                alt="Future Outlook"
                className="w-70 h-85 object-cover rounded-lg shadow-lg ml-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Team */}
<section className="py-16 bg-[#1A3D6D] w-full">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-white mb-8 text-center font-custom">
      <FontAwesomeIcon icon={faUsers} className="text-purple-300 mr-3" />
      The Team
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="text-center bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 active:translate-y-[-5px]"
          style={{
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <img
            src={member.photo}
            alt={`${member.name}'s photo`}
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800 font-custom">{member.name}</h3>
          <p className="text-sm font-semibold text-purple-600 font-custom">
            {member.roles.join(" | ")}
          </p>
        </div>
      ))}
    </div>

    {/* Additional Team Descriptions */}
    <div className="mt-12 p-6 bg-white rounded-lg shadow-lg text-gray-800">
      <p className="text-lg leading-relaxed">
        <strong className="font-bold text-black">Development Team:</strong> Responsible for crafting robust and scalable features.
      </p>
      <p className="text-lg leading-relaxed mt-4">
        <strong className="font-bold text-black">Design Team:</strong> Focused on creating an intuitive and visually appealing interface.
      </p>
      <p className="text-lg leading-relaxed mt-4">
        <strong className="font-bold text-black">Content Team:</strong> Ensured all tools and documentation align with user needs and tone.
      </p>
      <p className="text-lg leading-relaxed mt-4">
        <strong className="font-bold text-black">Quality Assurance (QA):</strong> Dedicated to eliminating bugs and ensuring a flawless user experience.
      </p>
    </div>
  </div>
</section>


    </div>
  );
};

export default About;