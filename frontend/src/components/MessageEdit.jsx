import React, { useState, useEffect } from "react";
import { getUserStyles, getStyleQuestions, sendToChatGPT } from "../requests/profile";
import StyleDetailsModal from "./StyleDetailsModal";

const MessageEditingPage = () => {
    const [stylesData, setStylesData] = useState([]);
    const [loadingStyles, setLoadingStyles] = useState(true);
    const [loadingResponse, setLoadingResponse] = useState(false);

    const [formData, setFormData] = useState({
        request: "",
        category: "formal",
        recipients: "",
        slang: false,
        intentional_errors: false,
        detail_level: "moderate",
        tone: "friendly",
        vocabulary_complexity: "moderate",
        politeness_level: "moderate",
        punctuation_style: "formal",
        message_type: "email",
        outputText: ""
    });

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const [selectedStyle, setSelectedStyle] = useState(null);
    const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const data = await getUserStyles();
                setStylesData(data);
            } catch (error) {
                console.error("Error fetching styles:", error);
            } finally {
                setLoadingStyles(false);
            }
        };
        fetchStyles();
    }, []);

    useEffect(() => {
        const fetchQuestionsForCategory = async () => {
            if (!showAdvanced) {
                setQuestions([]);
                setAnswers({});
                return;
            }

            if (formData.category) {
                try {
                    const qData = await getStyleQuestions(formData.category);
                    setQuestions(qData);

                    const initialAnswers = {};
                    qData.forEach((q) => {
                        initialAnswers[q.id] = "";
                    });
                    setAnswers(initialAnswers);
                } catch (error) {
                    console.error("Error fetching questions:", error);
                    setQuestions([]);
                    setAnswers({});
                }
            }
        };
        fetchQuestionsForCategory();
    }, [showAdvanced, formData.category]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const toggleAdvanced = () => {
        setShowAdvanced((prev) => !prev);
    };

    const handleQuestionAnswerChange = (qIdentifier, e) => {
        const { value } = e.target;
        setAnswers((prev) => ({
            ...prev,
            [qIdentifier]: value
        }));
    };

    const handleSendRequest = async () => {
        setLoadingResponse(true);

        const payload = {
            request: formData.request,
            category: formData.category,
            recipients: formData.recipients,
            slang: formData.slang,
            intentional_errors: formData.intentional_errors,
            detail_level: formData.detail_level,
            tone: formData.tone,
            vocabulary_complexity: formData.vocabulary_complexity,
            politeness_level: formData.politeness_level,
            punctuation_style: formData.punctuation_style,
            message_type: formData.message_type,
            questions: questions.map((q, index) => {
                const answerKey = q.id !== undefined ? q.id : index;
                return {
                    question: q.question,
                    answer: answers[answerKey] || "dont use the data for response"
                };
            })
        };

        try {
            const data = await sendToChatGPT(payload);
            const generatedResponse = data.response || "No response";
            setFormData((prev) => ({ ...prev, outputText: generatedResponse }));
        } catch (error) {
            console.error("Error sending request:", error);
            if (error.response) {
                console.error("Error response from server:", error.response);
            }
            setFormData((prev) => ({ ...prev, outputText: "No response" }));
        } finally {
            setLoadingResponse(false);
        }
    };

    const openStyleModal = (style) => {
        setSelectedStyle(style);
        setIsStyleModalOpen(true);
    };

    const closeStyleModal = () => {
        setSelectedStyle(null);
        setIsStyleModalOpen(false);
    };

    if (loadingStyles) {
        return <p className="text-text">Loading styles...</p>;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center font-mono overflow-y-auto">
            <StyleDetailsModal
                isOpen={isStyleModalOpen}
                styleData={selectedStyle}
                onClose={closeStyleModal}
            />

            <main className="w-11/12 max-w-6xl mt-4">
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                    <div className="flex flex-col gap-4 w-full max-w-3xl">

                        <div
                            className="bg-secondary/80 p-5 border-2 border-accent shadow-md rounded-md flex flex-col gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-text mb-2">Input</h3>
                                <textarea
                                    name="request"
                                    value={formData.request}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded text-text resize-none min-h-[100px]"
                                    placeholder="Type your input here..."
                                ></textarea>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-text mb-2">Output</h3>
                                <div className="w-full border p-2 rounded bg-white text-text min-h-[100px]">
                                    {loadingResponse ? "Waiting for response..." : (formData.outputText || "No response")}
                                </div>
                            </div>
                        </div>

                        {showAdvanced && (
                            <div className="bg-secondary/80 p-5 border-2 border-accent shadow-md rounded-md mb-5">
                                <h3 className="text-xl font-semibold text-text mb-4">Advanced Settings</h3>
                                <div className="grid grid-cols-2 gap-4 text-text text-sm mb-4">
                                    <div>
                                        <label className="font-semibold block">Slang</label>
                                        <input
                                            type="checkbox"
                                            name="slang"
                                            checked={formData.slang}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <span>Enable slang</span>
                                    </div>
                                    <div>
                                        <label className="font-semibold block">Intentional Errors</label>
                                        <input
                                            type="checkbox"
                                            name="intentional_errors"
                                            checked={formData.intentional_errors}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <span>Allow errors</span>
                                    </div>
                                    <div>
                                        <label className="font-semibold block">Detail Level</label>
                                        <select
                                            name="detail_level"
                                            value={formData.detail_level}
                                            onChange={handleChange}
                                            className="border p-1 w-full rounded"
                                        >
                                            <option value="brief">Brief</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="elaborate">Elaborate</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-semibold block">Tone</label>
                                        <select
                                            name="tone"
                                            value={formData.tone}
                                            onChange={handleChange}
                                            className="border p-1 w-full rounded"
                                        >
                                            <option value="polite">Polite</option>
                                            <option value="friendly">Friendly</option>
                                            <option value="serious">Serious</option>
                                            <option value="playful">Playful</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-semibold block">Vocabulary Complexity</label>
                                        <select
                                            name="vocabulary_complexity"
                                            value={formData.vocabulary_complexity}
                                            onChange={handleChange}
                                            className="border p-1 w-full rounded"
                                        >
                                            <option value="simple">Simple</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-semibold block">Politeness Level</label>
                                        <select
                                            name="politeness_level"
                                            value={formData.politeness_level}
                                            onChange={handleChange}
                                            className="border p-1 w-full rounded"
                                        >
                                            <option value="low">Low</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-semibold block">Punctuation Style</label>
                                        <select
                                            name="punctuation_style"
                                            value={formData.punctuation_style}
                                            onChange={handleChange}
                                            className="border p-1 w-full rounded"
                                        >
                                            <option value="formal">Formal</option>
                                            <option value="casual">Casual</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-semibold block">Message Type</label>
                                        <select
                                            name="message_type"
                                            value={formData.message_type}
                                            onChange={handleChange}
                                            className="border p-1 w-full rounded"
                                        >
                                            <option value="chat">Chat</option>
                                            <option value="email">Email</option>
                                        </select>
                                    </div>
                                </div>

                                <h4 className="text-lg font-semibold text-text mb-2">Questions</h4>
                                {questions.length === 0 ? (
                                    <p className="text-text text-sm">No questions available.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {questions.map((q, index) => {
                                            const answerKey = q.id !== undefined ? q.id : index;
                                            return (
                                                <div key={answerKey} className="bg-white p-3 rounded shadow-md">
                                                    <p className="font-semibold text-text">{q.question}</p>
                                                    <textarea
                                                        className="w-full mt-2 border p-2 rounded text-text resize-none"
                                                        placeholder="Your answer..."
                                                        value={answers[answerKey] || ""}
                                                        onChange={(e) => handleQuestionAnswerChange(answerKey, e)}
                                                    ></textarea>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="w-64 flex-shrink-0 flex flex-col gap-4">
                        <div className="bg-secondary/80 p-5 border-2 border-accent shadow-md rounded-md">
                            <h3 className="text-lg font-semibold text-text mb-2">Recipient</h3>
                            <textarea
                                name="recipients"
                                value={formData.recipients}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-text resize-none mb-4 min-h-[60px]"
                                placeholder="Recipient name or role"
                            ></textarea>

                            <h3 className="text-lg font-semibold text-text mb-2">Category</h3>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-text"
                            >
                                <option value="formal">Formal</option>
                                <option value="neutral">Neutral</option>
                                <option value="informal">Informal</option>
                            </select>
                        </div>

                        <div className="bg-secondary/80 p-5 border-2 border-accent shadow-md rounded-md flex flex-col">
                            <h3 className="text-lg font-semibold text-text mb-2">Styles</h3>
                            <div className="mt-2 max-h-48 overflow-y-auto bg-gray-100 rounded p-2">
                                {stylesData.length === 0 ? (
                                    <p className="text-text">No styles configured...</p>
                                ) : (
                                    <ul className="space-y-4">
                                        {stylesData.map((style, index) => (
                                            <li
                                                key={index}
                                                className="p-2 bg-white rounded shadow-md hover:bg-gray-200 cursor-pointer transition"
                                                onClick={() => openStyleModal(style)}
                                            >
                                                <p><strong>Name:</strong> {style.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div
                            className="bg-secondary/80 p-5 border-2 border-accent shadow-md rounded-md flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-text">Advanced</h3>
                                <button
                                    className="text-blue-600 underline text-sm"
                                    onClick={toggleAdvanced}
                                >
                                    {showAdvanced ? "Hide" : "Show"}
                                </button>
                            </div>
                            <button
                                onClick={handleSendRequest}
                                className="bg-primary text-background px-4 py-2 rounded hover:bg-accent transition-all duration-300 w-full"
                            >
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MessageEditingPage;