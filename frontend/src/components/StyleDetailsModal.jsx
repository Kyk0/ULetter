import React from "react";

const StyleDetailsModal = ({ isOpen, styleData, onClose }) => {
    if (!isOpen || !styleData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-2">
            <div className="bg-white p-4 rounded-md shadow-md w-11/12 lg:w-1/3 relative max-h-[90vh] overflow-auto">
                <button
                    className="absolute top-2 right-2 text-black font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3 className="text-lg font-bold mb-2">{styleData.name}</h3>
                <div className="space-y-2 text-sm">
                    <div>
                        <strong>Category:</strong> {styleData.category}
                    </div>
                    <div>
                        <strong>Recipients:</strong> {styleData.recipients}
                    </div>
                    <div>
                        <strong>Slang:</strong> {styleData.slang ? "Yes" : "No"}
                    </div>
                    <div>
                        <strong>Intentional Errors:</strong> {styleData.intentional_errors ? "Yes" : "No"}
                    </div>
                    <div>
                        <strong>Detail Level:</strong> {styleData.detail_level}
                    </div>
                    <div>
                        <strong>Tone:</strong> {styleData.tone}
                    </div>
                    <div>
                        <strong>Vocabulary Complexity:</strong> {styleData.vocabulary_complexity}
                    </div>
                    <div>
                        <strong>Politeness Level:</strong> {styleData.politeness_level}
                    </div>
                    <div>
                        <strong>Punctuation Style:</strong> {styleData.punctuation_style}
                    </div>
                    <div>
                        <strong>Message Type:</strong> {styleData.message_type}
                    </div>
                    {styleData.questions && styleData.questions.length > 0 && (
                        <div className="mt-2">
                            <strong>Questions:</strong>
                            <ul className="list-disc ml-4">
                                {styleData.questions.map((q, qIndex) => (
                                    <li key={qIndex}>
                                        <strong>Q:</strong> {q.question}
                                        <br />
                                        <strong>A:</strong> {q.answer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StyleDetailsModal;