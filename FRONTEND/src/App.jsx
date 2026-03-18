// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Auth from './pages/Auth';
// import AdminAuth from "./pages/AdminAuth";
// import AdminDashboard from './components/AdminDashBoard';
// import Market from "./pages/Market";
// import Explore from "./pages/Explore"

// function App() {
//   const location = useLocation();

//   // Hide navbar on admin pages
//   const hideNavbar = location.pathname.startsWith("/admin");

//   return (
//     <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">
      
//       {/* Navbar only for user pages */}
//       {!hideNavbar && <Navbar />}

//       <main>
//         <Routes>
//           {/* User Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/auth" element={<Auth />} />
//           <Route path="/market" element={<Market />} />


//           {/* Admin Routes */}
//           <Route path="/admin" element={<AdminAuth />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />

//           {/* Redirect unknown routes */}
//           <Route path="*" element={<Navigate to="/" />} />
//           <Route path="/market" element={<Market />} />
//           <Route path='/explore' element={<Explore />}/>
//            <Route path="/portfolio" element={<PortfolioPage />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;


// // import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Home from './pages/Home';
// // import Auth from './pages/Auth';
// // import AdminAuth from "./pages/AdminAuth";
// // import AdminDashboard from './components/AdminDashBoard';
// // import Market from "./pages/Market";
// // import ProtectedRoute from './components/ProtectedRoute';


// // function App() {
// //   const location = useLocation();
 
// //   // Hide navbar on admin pages
// //   const hideNavbar = location.pathname.startsWith("/admin");
 
// //   // const token = localStorage.getItem("token");
 
// //   return (
// //     <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">
     
// //       {/* Navbar only for user pages */}
// //       {!hideNavbar && <Navbar />}
 
// //       <main>
// //         <Routes>
// //           {/* User Routes */}
// //           <Route path="/" element={<Home />} />
// //           <Route path="/auth" element={<Auth />} />
// //           <Route path="/market" element={<Market />} />

// //           {/* Admin Login */}
// //           <Route
// //             path="/admin"
// //             element={
// //               token ? <Navigate to="/admin/dashboard" /> : <AdminAuth />
// //             }
// //           />

// //           {/* Protected Dashboard */}
// //           <Route
// //             path="/admin/dashboard"
// //             element={
// //               <ProtectedRoute>
// //                 <AdminDashboard />
// //               </ProtectedRoute>
// //             }
// //           />
// // < HEAD
 
// //           {/* Fallback Route */}
// //           <Route path="*" element={<Navigate to="/" />} />
 


// //           {/* Fallback Route */}
// //           <Route path="*" element={<Navigate to="/" />} />

// //         </Routes>
// //       </main>
// //     </div>
// //   );
// // }
 
// // export default App;


// src/App.jsx

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from './components/AdminDashBoard';
import Market from "./pages/Market";
import Explore from "./pages/Explore";
import PortfolioPage from "./pages/PortfolioPage"; // ✅ ADD THIS

function App() {
  const location = useLocation();

  // Hide navbar on admin + explore + portfolio pages
  // (they have their own ExploreNavbar)
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/explore") ||
    location.pathname.startsWith("/portfolio");

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">

      {/* Navbar only for user pages */}
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>

          {/* ── User Routes ── */}
          <Route path="/"          element={<Home />} />
          <Route path="/auth"      element={<Auth />} />
          <Route path="/market"    element={<Market />} />
          <Route path="/explore"   element={<Explore />} />       {/* ✅ */}
          <Route path="/portfolio" element={<PortfolioPage />} /> {/* ✅ */}

          {/* ── Admin Routes ── */}
          <Route path="/admin"           element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;