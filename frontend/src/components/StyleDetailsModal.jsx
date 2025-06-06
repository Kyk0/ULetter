import React from "react";
import {deleteStyle} from "../requests/profile"

const StyleDetailsModal = ({ isOpen, styleData, onClose, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await deleteStyle(styleData.name);

            const styles = JSON.parse(localStorage.getItem("styles")) || [];
            const updatedStyles = styles.filter((style) => style.name !== styleData.name);
            localStorage.setItem("styles", JSON.stringify(updatedStyles));

            alert(response.message || "Style deleted successfully");
            onDelete(styleData.name);
            onClose();
        } catch (error) {
            const errorMessage =
                error.response?.data?.error || "Failed to delete style. Please try again.";
            alert(errorMessage);
        }
    };

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
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StyleDetailsModal;