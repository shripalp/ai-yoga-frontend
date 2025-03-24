import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Schedule from "./pages/Schedule";
import Pricing from "./pages/Pricing";
import Preferences from "./pages/Preferences";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import YogaTherapy from "./pages/YogaTherapy";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/yoga-therapy" element={<YogaTherapy />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        {user && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
