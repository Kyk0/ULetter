import React from "react";

const MessageHistoryModal = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-2">
            <div className="bg-white p-4 rounded-md shadow-md w-11/12 lg:w-1/3 relative">
                <button
                    className="absolute top-2 right-2 text-black font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3 className="text-lg font-bold mb-2">Message Details</h3>
                {message && (
                    <div className="space-y-2">
                        <div className="text-sm">
                            <strong>Request:</strong>
                            <div className="mt-1 p-1 bg-gray-100 rounded">
                                <pre className="whitespace-pre-wrap break-words text-xs leading-tight">
                                    {message.request}
                                </pre>
                            </div>
                        </div>

                        <div className="text-sm">
                            <strong>Parameters:</strong>
                            <div className="mt-1 p-1 bg-gray-100 rounded max-h-48 overflow-auto">
                                <pre className="whitespace-pre-wrap break-words text-xs leading-tight">
                                    {message.parameters
                                        ? JSON.stringify(message.parameters, null, 2)
                                        : "No parameters available"}
                                </pre>
                            </div>
                        </div>

                        <div className="text-sm">
                            <strong>Response:</strong>
                            <div className="mt-1 p-1 bg-gray-100 rounded max-h-48 overflow-auto">
                                <pre className="whitespace-pre-wrap break-words text-xs leading-tight">
                                    {message.response
                                        ? JSON.stringify(message.response, null, 2)
                                        : "No response available"}
                                </pre>
                            </div>
                        </div>

                        <div className="text-sm">
                            <strong>Timestamp:</strong>
                            <div className="mt-1 p-1 bg-gray-100 rounded">
                                <pre className="whitespace-pre-wrap break-words text-xs leading-tight">
                                    {new Date(message.timestamp).toLocaleString()}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageHistoryModal;