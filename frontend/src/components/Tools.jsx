import React from "react";

function Tools() {
    return (
        <div className="fixed w-full h-screen bg-background flex flex-col items-center font-mono overflow-hidden">
            <header className="w-11/12 max-w-7xl mt-12 mb-8 text-center">
                <h1 className="text-4xl font-bold text-text">
                    Explore Our Tools
                </h1>
                <p className="text-text text-lg mt-4">
                    Choose the right tool to elevate your communication and style.
                </p>
            </header>

            <main className="w-11/12 max-w-7xl flex flex-col lg:flex-row gap-6 mb-12">
                <div className="flex-1 bg-secondary/80 p-10 border-2 border-accent shadow-md rounded-md flex flex-col justify-center items-start py-20 transform transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-secondary/80 to-secondary/60">
                    <h2 className="text-3xl font-bold text-text mb-6">
                        Message Editing Tool
                    </h2>
                    <p className="text-text text-base mb-10 max-w-sm">
                        Refine your words effortlessly. Enhance tone, improve clarity, and perfect your message before sending it out.
                    </p>
                    <a
                        href="/message-edit"
                        className="bg-primary text-background px-6 py-3 rounded hover:bg-accent transition-all duration-300 text-lg font-semibold"
                    >
                        Go to Message Editing
                    </a>
                </div>

                <div className="flex-1 bg-secondary/80 p-10 border-2 border-accent shadow-md rounded-md flex flex-col justify-center items-start py-20 transform transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-secondary/80 to-secondary/60">
                    <h2 className="text-3xl font-bold text-text mb-6">
                        Styling Tool
                    </h2>
                    <p className="text-text text-base mb-10 max-w-sm">
                        Define your unique style once and apply it everywhere. Save presets to keep your voice and tone consistent.
                    </p>
                    <a
                        href="/styling-tool"
                        className="bg-primary text-background px-6 py-3 rounded hover:bg-accent transition-all duration-300 text-lg font-semibold"
                    >
                        Go to Styling Tool
                    </a>
                </div>
            </main>
        </div>
    );
}

export default Tools;