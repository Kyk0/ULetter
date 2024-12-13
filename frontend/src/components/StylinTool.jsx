import React, { useState, useEffect } from "react";
import { getStyleQuestions, saveStyle } from "../requests/profile";

function StylingTool() {
    const [formData, setFormData] = useState({
        name: "",
        category: "formal",
        recipients: "",
        slang: false,
        intentional_errors: false,
        detail_level: "brief",
        tone: "polite",
        vocabulary_complexity: "simple",
        politeness_level: "low",
        punctuation_style: "formal",
        message_type: "chat",
        questions: Array.from({ length: 5 }, () => ({ question: "", answer: "" }))
    });

    const [questionsFromBackend, setQuestionsFromBackend] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoadingQuestions(true);
            setErrors({});
            try {
                const qData = await getStyleQuestions(formData.category);
                setQuestionsFromBackend(qData);
                setFormData((prev) => ({
                    ...prev,
                    questions: qData.map((q) => ({
                        question: q.question,
                        answer: ""
                    }))
                }));
            } catch (error) {
                setErrors({ general: "Failed to load questions. Please try again." });
            } finally {
                setLoadingQuestions(false);
            }
        };
        fetchQuestions();
    }, [formData.category]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleQuestionAnswerChange = (index, value) => {
        setFormData((prev) => {
            const updated = [...prev.questions];
            updated[index].answer = value;
            return { ...prev, questions: updated };
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.recipients.trim()) newErrors.recipients = "Recipients are required.";

        if (!['formal', 'neutral', 'informal'].includes(formData.category)) {
            newErrors.category = "Category must be formal, neutral, or informal.";
        }

        const detailOptions = ['brief', 'moderate', 'elaborate'];
        if (!detailOptions.includes(formData.detail_level)) {
            newErrors.detail_level = "Detail Level must be brief, moderate, or elaborate.";
        }

        const toneOptions = ['polite', 'friendly', 'serious', 'playful'];
        if (!toneOptions.includes(formData.tone)) {
            newErrors.tone = "Tone must be polite, friendly, serious, or playful.";
        }

        const vocabOptions = ['simple', 'moderate', 'advanced'];
        if (!vocabOptions.includes(formData.vocabulary_complexity)) {
            newErrors.vocabulary_complexity = "Vocabulary Complexity must be simple, moderate, or advanced.";
        }

        const politenessOptions = ['low', 'moderate', 'high'];
        if (!politenessOptions.includes(formData.politeness_level)) {
            newErrors.politeness_level = "Politeness Level must be low, moderate, or high.";
        }

        const punctuationOptions = ['formal', 'casual'];
        if (!punctuationOptions.includes(formData.punctuation_style)) {
            newErrors.punctuation_style = "Punctuation Style must be formal or casual.";
        }

        const messageTypeOptions = ['chat', 'email'];
        if (!messageTypeOptions.includes(formData.message_type)) {
            newErrors.message_type = "Message Type must be chat or email.";
        }

        if (!formData.questions || formData.questions.length !== 5) {
            newErrors.questions = "Exactly five questions are required.";
        } else {
            formData.questions.forEach((q, i) => {
                if (!q.question.trim()) {
                    newErrors[`questions[${i}].question`] = "Question cannot be empty.";
                }
                if (!q.answer.trim()) {
                    newErrors[`questions[${i}].answer`] = "Answer cannot be empty.";
                }
            });
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        const frontErrors = validateForm();
        if (Object.keys(frontErrors).length > 0) {
            setErrors(frontErrors);
            return;
        }

        setLoadingSave(true);
        try {
            await saveStyle(formData);
            setSuccessMessage("Style created successfully!");
            setFormData({
                name: "",
                category: "formal",
                recipients: "",
                slang: false,
                intentional_errors: false,
                detail_level: "brief",
                tone: "polite",
                vocabulary_complexity: "simple",
                politeness_level: "low",
                punctuation_style: "formal",
                message_type: "chat",
                questions: Array.from({ length: 5 }, () => ({ question: "", answer: "" }))
            });
        } catch (error) {
            if (error.response && error.response.data) {
                if (typeof error.response.data === 'object') {
                    setErrors(error.response.data);
                } else {
                    setErrors({ general: error.response.data });
                }
            } else {
                setErrors({ general: "An unexpected error occurred." });
            }
        } finally {
            setLoadingSave(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center font-mono overflow-y-auto">
            <header className="w-11/12 max-w-7xl mt-12 mb-8 text-center">
                <h1 className="text-4xl font-bold text-text">Create Your Style</h1>
                <p className="text-text text-lg mt-4">
                    Define a new style by specifying all parameters and answering 5 category-based questions.
                </p>
            </header>

            <main className="w-11/12 max-w-3xl mb-12 bg-secondary/80 p-10 border-2 border-accent shadow-md rounded-md">
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-200 text-green-800 rounded">
                        {successMessage}
                    </div>
                )}
                {errors.general && (
                    <div className="mb-6 p-4 bg-red-200 text-red-800 rounded">
                        {errors.general}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-text font-semibold mb-1">Style Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded text-text"
                            placeholder="Enter a name for your style"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-text font-semibold mb-1">Category*</label>
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
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <label className="block text-text font-semibold mb-1">Recipients*</label>
                        <input
                            type="text"
                            name="recipients"
                            value={formData.recipients}
                            onChange={handleChange}
                            className="w-full border p-2 rounded text-text"
                            placeholder="Who is this style intended for?"
                        />
                        {errors.recipients && <p className="text-red-500 text-sm mt-1">{errors.recipients}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-text font-semibold mb-1">Slang</label>
                            <input
                                type="checkbox"
                                name="slang"
                                checked={formData.slang}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Use slang</span>
                            {errors.slang && <p className="text-red-500 text-sm mt-1">{errors.slang}</p>}
                        </div>

                        <div>
                            <label className="block text-text font-semibold mb-1">Intentional Errors</label>
                            <input
                                type="checkbox"
                                name="intentional_errors"
                                checked={formData.intentional_errors}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Allow errors</span>
                            {errors.intentional_errors && <p className="text-red-500 text-sm mt-1">{errors.intentional_errors}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-text font-semibold mb-1">Detail Level*</label>
                            <select
                                name="detail_level"
                                value={formData.detail_level}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-text"
                            >
                                <option value="brief">Brief</option>
                                <option value="moderate">Moderate</option>
                                <option value="elaborate">Elaborate</option>
                            </select>
                            {errors.detail_level && <p className="text-red-500 text-sm mt-1">{errors.detail_level}</p>}
                        </div>

                        <div>
                            <label className="block text-text font-semibold mb-1">Tone*</label>
                            <select
                                name="tone"
                                value={formData.tone}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-text"
                            >
                                <option value="polite">Polite</option>
                                <option value="friendly">Friendly</option>
                                <option value="serious">Serious</option>
                                <option value="playful">Playful</option>
                            </select>
                            {errors.tone && <p className="text-red-500 text-sm mt-1">{errors.tone}</p>}
                        </div>

                        <div>
                            <label className="block text-text font-semibold mb-1">Vocabulary Complexity*</label>
                            <select
                                name="vocabulary_complexity"
                                value={formData.vocabulary_complexity}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-text"
                            >
                                <option value="simple">Simple</option>
                                <option value="moderate">Moderate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                            {errors.vocabulary_complexity && <p className="text-red-500 text-sm mt-1">{errors.vocabulary_complexity}</p>}
                        </div>

                        <div>
                            <label className="block text-text font-semibold mb-1">Politeness Level*</label>
                            <select
                                name="politeness_level"
                                value={formData.politeness_level}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-text"
                            >
                                <option value="low">Low</option>
                                <option value="moderate">Moderate</option>
                                <option value="high">High</option>
                            </select>
                            {errors.politeness_level && <p className="text-red-500 text-sm mt-1">{errors.politeness_level}</p>}
                        </div>

                        <div>
                            <label className="block text-text font-semibold mb-1">Punctuation Style*</label>
                            <select
                                name="punctuation_style"
                                value={formData.punctuation_style}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-text"
                            >
                                <option value="formal">Formal</option>
                                <option value="casual">Casual</option>
                            </select>
                            {errors.punctuation_style && <p className="text-red-500 text-sm mt-1">{errors.punctuation_style}</p>}
                        </div>

                        <div>
                            <label className="block text-text font-semibold mb-1">Message Type*</label>
                            <select
                                name="message_type"
                                value={formData.message_type}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-text"
                            >
                                <option value="chat">Chat</option>
                                <option value="email">Email</option>
                            </select>
                            {errors.message_type && <p className="text-red-500 text-sm mt-1">{errors.message_type}</p>}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-text mb-2">Questions*</h3>
                        {errors.questions && <p className="text-red-500 text-sm mb-2">{errors.questions}</p>}
                        {loadingQuestions ? (
                            <p className="text-text">Loading questions...</p>
                        ) : (
                            formData.questions.map((q, index) => (
                                <div key={index} className="bg-white p-4 rounded shadow-md mb-4">
                                    <p className="font-semibold text-text mb-2">
                                        {questionsFromBackend[index] ? questionsFromBackend[index].question : "Question not loaded."}
                                    </p>
                                    <textarea
                                        className="w-full border p-2 rounded text-text resize-none"
                                        placeholder="Your answer"
                                        value={q.answer}
                                        onChange={(e) => handleQuestionAnswerChange(index, e.target.value)}
                                    ></textarea>
                                    {errors[`questions[${index}].answer`] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors[`questions[${index}].answer`]}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loadingSave || loadingQuestions}
                            className="bg-primary text-background px-6 py-3 rounded hover:bg-accent transition-all duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingSave ? "Saving..." : "Save Style"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default StylingTool;