import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import MessageEdit from './pages/MessageEdit';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Tools from './pages/Tools';
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/message-edit" element={<MessageEdit />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/tools" element={<Tools />} />
            </Routes>
        </Router>
    );
};

export default App;