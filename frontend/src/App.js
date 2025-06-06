import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Profile from './components/Profile';
import Tools from './components/Tools';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MinimalNavbar from "./components/MinimalNavbar";
import SignIn from "./components/SignIn";
import { AuthContext } from "./services/AuthContext";
import MessageEdit from "./components/MessageEdit";
import StylingTool from "./components/StylinTool";

const App = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path="/profile"
                        element={
                            isLoggedIn() ? <Profile /> : <Navigate to="/signin?type=login" />
                        }
                    />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/message-edit" element={<MessageEdit />} />
                    <Route path="/styling-tool" element={<StylingTool />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </Layout>
        </Router>
    );
};

const Layout = ({ children }) => {
    const location = useLocation();
    const minimalNavbarRoutes = ["/signin"];
    const noFooterRoutes = ["/profile", "/tools"];
    const isMinimalNavbar = minimalNavbarRoutes.includes(location.pathname);
    const isNoFooter = noFooterRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {isMinimalNavbar ? <MinimalNavbar /> : <Navbar />}
            <main className={`flex-grow ${isMinimalNavbar ? "pt-16" : "pt-16"}`}>
                {children}
            </main>
            {!isNoFooter && <Footer />}
        </div>
    );
};

export default App;