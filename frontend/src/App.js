import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import LogoutPage from './components/LogoutPage';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentPage from './components/PaymentPage';
import Grants from './components/Grants';
import Home from './components/Home';
import AdminGrantsPage from './components/AdminGrantsPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/grants" element={<Grants/>} />
                <Route path="/admin"
                    element={window.location.search.includes(`key=${process.env.REACT_APP_ADMIN_SECRET_KEY}`) ? 
                        <AdminGrantsPage /> : 
                        <p>Unauthorized</p>}
                />
                <Route path="/logout" element={<LogoutPage/>}></Route>
            </Routes>
        </Router>
    );
};

export default App;



// import React from "react";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import theme from "./styles/theme"; // Adjust the path as needed
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import LogoutPage from "./components/LogoutPage";
// import Dashboard from "./components/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PaymentPage from "./components/PaymentPage";
// import Grants from "./components/Grants";
// import Home from "./components/Home";
// import AdminGrantsPage from "./components/AdminGrantsPage";

// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/grants" element={<Grants />} />
//           <Route
//             path="/admin"
//             element={
//               window.location.search.includes(`key=shhh`) ? (
//                 <AdminGrantsPage />
//               ) : (
//                 <p>Unauthorized</p>
//               )
//             }
//           />
//           <Route path="/logout" element={<LogoutPage />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;
