import React from "react";
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import About from './pages/.jsx/About';
import Contact from './pages/.jsx/Contact';
import Home from './pages/.jsx/Home';
import MessageEdit from './pages/.jsx/MessageEdit';
import Profile from './pages/.jsx/Profile';
import Tools from './pages/.jsx/Tools';
import Navbar from "./components/Navbar";
import Signup from './pages/.jsx/SignIn';
import MinimalNavbar from "./components/MinimalNavbar";
import SignIn from "./pages/.jsx/SignIn";



const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/message-edit" element={<MessageEdit />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </Layout>
        </Router>
    );
};

const Layout = ({ children }) => {
    const location = useLocation();
    const minimalNavbarRoutes = ["/signin"];
    const isMinimalNavbar = minimalNavbarRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-background flex flex-col">

            {isMinimalNavbar ? <MinimalNavbar /> : <Navbar />}

            <main className={`flex-grow ${isMinimalNavbar ? "pt-16" : "pt-16"}`}>
                {children}
            </main>
        </div>
    );
};

export default App;