import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/register`, formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred');
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

            {/* Register Form */}
            <div className="flex justify-center py-20">
                <div className="bg-[#A78295] text-[#331D2C] p-8 rounded-lg max-w-md shadow-xl">
                    <h2 className="text-3xl font-bold mb-4">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mb-4 bg-[#3F2E3E] text-[#EFE1D1] border-2 border-[#A78295] rounded-lg"
                        />
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
                            Register
                        </button>
                    </form>
                    <p className="mt-4">
                        <span className="text-[#EFE1D1]">Already have an account?</span>
                        <a href="/login" className="text-[#EFE1D1] font-semibold"> Login here</a>
                    </p>
                    <p>{message}</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#3F2E3E] text-[#EFE1D1] py-8 mt-16">
                <div className="text-center">
                    <p className="text-xl font-semibold">© 2025 GrantsHub. All rights reserved.</p>
                    <p className="mt-4">Your gateway to educational and business grants.</p>
                </div>
            </footer>

        </div>
    );
};

export default Register;
