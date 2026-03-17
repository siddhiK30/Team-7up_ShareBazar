import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from './components/AdminDashBoard';


function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">
      <Navbar /> 
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* Admin Login Page */}
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Add other routes as needed */}
        <Route
          path="/"
          element={
            <div style={{ textAlign: "center", padding: "100px" }}>
              <h2>Welcome to ShareBazar</h2>
            </div>
          }
        />


        
        </Routes>
      </main>
    </div>
  );
}

export default App;