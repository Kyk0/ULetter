import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faCode,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
    const teamMembers = [
        { name: "Kyk0", roles: ["Development Team", "Quality Assurance (QA)"], photo: "photo_2024-12-08_05-48-59.jpg" },
        { name: "FlashLLan", roles: ["Development Team", "Quality Assurance (QA)"], photo: "photo_2024-12-08_05-49-14.jpg" },
        { name: "arseniia02", roles: ["Development Team", "Design Team"], photo: "photo_2024-12-08_05-57-17.jpg" },
        { name: "nesrtvld", roles: ["Development Team", "Design Team"], photo: "/images/nesrtvld.jpg" },
        { name: "yuliialuhutsenko", roles: ["Content Team", "Design Team"], photo: "/images/yuliialuhutsenko.jpg" },
        { name: "SeaOfWater", roles: ["Design Team", "Quality Assurance (QA)"], photo: "photo_2024-12-08_05-49-21.jpg" },
      ];      

  return (
    <div className="font-sans">
      {/* About This Project */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-gray-50 w-full">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 pr-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          About the Project
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="text-blue-600 font-semibold">ULetter</span>, your ultimate platform for simplifying and enhancing written communication. 
          Designed to empower users—from professionals drafting formal documents to students perfecting essays—ULetter is committed to making writing easier, clearer, and more effective.
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mt-4 space-y-2">
          <li>Rewrite letters in specific styles, such as concise, slang, or professional.</li>
          <li>Compose letters from scratch by specifying a subject and tone.</li>
          <li>Learn and adapt to your writing style for future communications.</li>
          <li>Upload drafts to receive actionable feedback and recommendations for improvement.</li>
        </ul>
      </div>
      <div className="w-full md:w-1/2">
        <img
          src="how-to-write-a-letter-to-the-editor.jpg"
          alt="About the project"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</section>

     {/* Project Highlights */}
<section className="py-16 bg-gradient-to-b from-gray-100 to-gray-50 w-full">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          <FontAwesomeIcon icon={faCode} className="text-teal-600 mr-3" />
          Project Highlights
        </h2>
        <ul className="list-disc list-inside mt-4 text-gray-700 space-y-4">
          <li>
            <strong>Collaborative Effort:</strong> A multidisciplinary team of developers, designers, and content strategists worked together to create a seamless and user-friendly experience.
          </li>
          <li>
            <strong>Advanced Technologies:</strong>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-6">
              <li>Frontend: React.js for dynamic and responsive interfaces.</li>
              <li>Backend: Node.js with RESTful APIs for efficient server-side handling.</li>
              <li>Styling: Tailwind CSS for a modern, attractive design.</li>
              <li>Database: MongoDB for secure and scalable data management.</li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <img
          src="1663764430142.png"
          alt="Project Highlights"
          className="rounded-lg shadow-lg"
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
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          <FontAwesomeIcon icon={faLightbulb} className="text-purple-600 mr-3" />
          Future Outlook
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          At ULetter, innovation drives our mission to continuously improve how
          people communicate through written content. We are committed to expanding
          our platform's capabilities with advanced technologies and new features.
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
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
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</section>

    {/* The Team */}
<section className="py-16 bg-[#1A3D6D] w-full">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-white mb-8 text-center">
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
          <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
          <p className="text-sm font-semibold text-purple-600">
            {member.roles.join(" | ")}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default About;