import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";
import '../../MessageEdit.css';

function MessageEdit() {
    const [inputText, setInputText] = useState("");
    const [responseText, setResponseText] = useState("");
    const [mode, setMode] = useState("edit");
    const [messageType, setMessageType] = useState("chat");
    const [tone, setTone] = useState("semi-formal");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/sign-in');
        }
    }, [navigate]);

    const handleModeChange = (e) => setMode(e.target.value);
    const handleMessageTypeChange = (e) => {
        setMessageType(e.target.value);
        setTone(e.target.value === "email" ? "professional" : "semi-formal");
    };
    const handleToneChange = (e) => setTone(e.target.value);
    const handleInputChange = (e) => setInputText(e.target.value);
    const handleClearText = () => setInputText("");

    const handleSendRequest = () => {
        if (!isAuthenticated()) {
            alert("You must be logged in to perform this action.");
            navigate('/sign-in');
            return;
        }

        setLoading(true);
        const url = 'http://127.0.0.1:8000/api/process-message/';
        const params = new URLSearchParams({
            text: inputText,
            mode,
            messageType,
            tone
        });

        fetch(`${url}?${params.toString()}`, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setResponseText(data.response);
            })
            .catch(error => console.error("Error fetching data:", error))
            .finally(() => setLoading(false));
    };

    return (
        <div className="app">
            <h1>Message Editor</h1>

            <div className="response-container">
                <h3>Response:</h3>
                {loading ? <p>Loading...</p> : <pre>{responseText}</pre>}
            </div>

            <div className="settings">
                <Setting
                    label="Mode"
                    value={mode}
                    onChange={handleModeChange}
                    options={[
                        { value: "edit", label: "Edit", description: "Edit an existing message." },
                        { value: "create", label: "Create", description: "Create a new message." }
                    ]}
                />

                <Setting
                    label="Message Type"
                    value={messageType}
                    onChange={handleMessageTypeChange}
                    options={[
                        { value: "email", label: "Email", description: "For email messages." },
                        { value: "chat", label: "Chat", description: "For chat messages." }
                    ]}
                />

                <Setting
                    label="Tone"
                    value={tone}
                    onChange={handleToneChange}
                    options={
                        messageType === "email"
                            ? [
                                { value: "professional", label: "Professional", description: "Polished and formal." },
                                { value: "semi-formal", label: "Semi-Formal", description: "Friendly yet respectful." }
                            ]
                            : [
                                { value: "semi-formal", label: "Semi-Formal", description: "Friendly yet respectful." },
                                { value: "informal", label: "Informal", description: "Casual and relaxed." }
                            ]
                    }
                />
            </div>

            <div className="input-container">
                <label>Write your request here:</label>
                <textarea
                    className="input-text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Enter your message here"
                />
                <div className="button-group">
                    <button className="button" onClick={handleClearText}>Clear Text</button>
                    <button className="button" onClick={handleSendRequest}> Send </button>
                </div>
            </div>
        </div>
    );
}

function Setting({ label, value, onChange, options }) {
    return (
        <div className="setting">
            <label>{label}</label>
            <select value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <p className="description">
                {options.find((option) => option.value === value)?.description}
            </p>
        </div>
    );
}

export default MessageEdit;