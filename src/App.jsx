import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Preferences from "./pages/Preferences";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
