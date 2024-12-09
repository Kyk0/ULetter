import React from "react";

const MessageHistoryModal = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-3/4 lg:w-1/3 relative">
                <button
                    className="absolute top-2 right-2 text-black font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3 className="text-xl font-bold mb-4">Message Details</h3>
                {message && (
                    <div>
                        <p>
                            <strong>Request:</strong> {message.request}
                        </p>
                        <p>
                            <strong>Parameters:</strong> {message.parameters}
                        </p>
                        <p>
                            <strong>Response:</strong> {message.response}
                        </p>
                        <p>
                            <strong>Timestamp:</strong>{" "}
                            {new Date(message.timestamp).toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageHistoryModal;