// import React, { useState } from 'react';
// import axios from '../api/axiosConfig';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Step 1: Login request
//             const response = await axios.post(`/login`, formData, { withCredentials: true });
//             localStorage.setItem('token', response.data.token); // Save JWT
            
//             // Step 2: Check payment status
//             const userResponse = await axios.get('/user/me', { withCredentials: true });
//             const paymentStatus = userResponse.data.paymentStatus;

//             if (paymentStatus) {
//                 // If payment completed, navigate to dashboard
//                 navigate('/dashboard');
//             } else {
//                 // If payment not completed, navigate to payment page with email in the URL
//                 navigate(`/payment?email=${formData.email}`);
//             }
//         } catch (error) {
//             setMessage(error.response?.data?.error || 'An error occurred');
//         }
//     };

//     return (
// <div className="bg-gradient-to-br from-[#331D2C] to-[#3F2E3E] min-h-screen text-[#EFE1D1]">
//             {/* Navbar */}
//             <nav className="flex items-center justify-between p-6">
//                 <div className="text-2xl font-bold text-[#A78295]">GrantsHub</div>
//                 <div>
//                     <Link to="/" className="px-4 py-2 text-[#EFE1D1] hover:bg-[#A78295] rounded-lg">Home</Link>
//                 </div>
//             </nav>

//             {/* Login Form */}
//             <div className="flex justify-center py-20">
//                 <div className="bg-[#A78295] text-[#331D2C] p-8 rounded-lg max-w-md shadow-xl">
//                     <h2 className="text-3xl font-bold mb-4">Login</h2>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 mb-4 bg-[#3F2E3E] text-[#EFE1D1] border-2 border-[#A78295] rounded-lg"
//                         />
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 mb-4 bg-[#3F2E3E] text-[#EFE1D1] border-2 border-[#A78295] rounded-lg"
//                         />
//                         <button
//                             type="submit"
//                             className="w-full bg-[#331D2C] text-[#EFE1D1] py-2 rounded-lg hover:bg-[#3F2E3E] transition duration-300"
//                         >
//                             Login
//                         </button>
//                     </form>
//                     <p className="mt-4">
//                         <span className="text-[#EFE1D1]">Don't have an account?</span>
//                         <a href="/register" className="text-[#EFE1D1] font-semibold"> Register here</a>
//                     </p>
//                     <p>{message}</p>
//                 </div>
//             </div>

//             {/* Footer */}
//             <footer className="bg-[#3F2E3E] text-[#EFE1D1] py-8 ">
//                 <div className="text-center">
//                     <p className="text-xl font-semibold">© 2025 GrantsHub. All rights reserved.</p>
//                     <p className="mt-4">Your gateway to educational and business grants.</p>
//                 </div>
//             </footer>

//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Login request
            const response = await axios.post(`/login`, formData, { withCredentials: true });
            localStorage.setItem('token', response.data.token); // Save JWT

            // Step 2: Check payment status
            const userResponse = await axios.get('/user/me', { withCredentials: true });

            // Handle response to check payment status
            const paymentStatus = userResponse.data.paymentStatus;

            if (paymentStatus) {
                // If payment completed, navigate to dashboard
                navigate('/dashboard');
            } else {
                // If payment not completed, navigate to payment page with email in the URL
                navigate(`/payment?email=${formData.email}`);
            }
        } catch (error) {
            // Error handling for login and user fetching
            if (error.response?.status === 401) {
                setMessage('Unauthorized. Please login again.');
            } else {
                setMessage(error.response?.data?.error || 'An error occurred');
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#331D2C] to-[#3F2E3E] min-h-screen text-[#EFE1D1]">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-6">
                <div className="text-2xl font-bold text-[#A78295]">GrantsHub</div>
                <div>
                    <Link to="/" className="px-4 py-2 text-[#EFE1D1] hover:bg-[#A78295] rounded-lg">Home</Link>
                </div>
            </nav>

            {/* Login Form */}
            <div className="flex justify-center py-20">
                <div className="bg-[#A78295] text-[#331D2C] p-8 rounded-lg max-w-md shadow-xl">
                    <h2 className="text-3xl font-bold mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mb-4 bg-[#3F2E3E] text-[#EFE1D1] border-2 border-[#A78295] rounded-lg"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mb-4 bg-[#3F2E3E] text-[#EFE1D1] border-2 border-[#A78295] rounded-lg"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#331D2C] text-[#EFE1D1] py-2 rounded-lg hover:bg-[#3F2E3E] transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4">
                        <span className="text-[#EFE1D1]">Don't have an account?</span>
                        <a href="/register" className="text-[#EFE1D1] font-semibold"> Register here</a>
                    </p>
                    <p>{message}</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#3F2E3E] text-[#EFE1D1] py-8 ">
                <div className="text-center">
                    <p className="text-xl font-semibold">© 2025 GrantsHub. All rights reserved.</p>
                    <p className="mt-4">Your gateway to educational and business grants.</p>
                </div>
            </footer>
        </div>
    );
};

export default Login;
