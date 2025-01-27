import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gradient-to-br from-[#331D2C] to-[#3F2E3E] min-h-screen text-[#EFE1D1]">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-6">
                <div className="text-2xl font-bold text-[#A78295]">GrantsHub</div>
                <div>
                    <Link to="/login" className="px-4 py-2 text-[#EFE1D1] hover:bg-[#A78295] rounded-lg">Login</Link>
                    <Link to="/register" className="px-4 py-2 ml-4 text-[#EFE1D1] hover:bg-[#A78295] rounded-lg">Register</Link>
                </div>
            </nav>

            {/* Main content */}
            <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-[#A78295] mb-4">Welcome to GrantsHub</h1>
                <p className="text-xl max-w-xl mx-auto mb-8">GrantsHub is your go-to platform to access the best educational and business grants. Register, log in, and unlock premium features to boost your career.</p>

                <div className="flex justify-center mb-16">
                    <div className="bg-[#A78295] text-[#331D2C] p-8 rounded-lg max-w-md shadow-xl">
                        <h2 className="text-2xl font-bold mb-4">Premium Pack Features</h2>
                        <ul className="list-disc pl-6 mb-6">
                            <li>Access to exclusive grant listings</li>
                            <li>Priority support for grant applications</li>
                            <li>Expert tips and advice on grant writing</li>
                            <li>Instant alerts for new grant opportunities</li>
                        </ul>
                        <Link
                            to="/register"
                            className="block text-center px-6 py-3 bg-[#331D2C] text-[#EFE1D1] font-semibold rounded-lg hover:bg-[#3F2E3E] transition duration-300"
                        >
                            Register Now
                        </Link>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-[#A78295] mb-6">How GrantsHub Helps You</h2>
                <p className="text-xl max-w-3xl mx-auto mb-12">
                    Whether you're looking for funding for your business or education, GrantsHub simplifies the process. 
                    Get access to thousands of verified grants, stay up-to-date with new opportunities, and increase your chances of success with personalized tips and expert guidance.
                </p>

                <div className="flex justify-center">
                    <div className="max-w-4xl bg-[#3F2E3E] text-[#EFE1D1] rounded-lg shadow-xl p-12">
                        <h3 className="text-2xl font-bold mb-4">Unlock Your Full Potential with GrantsHub Premium</h3>
                        <p className="text-lg mb-6">GrantsHub Premium helps you find grants tailored to your needs, giving you the tools to succeed.</p>
                        <Link
                            to="/register"
                            className="text-center block text-[#EFE1D1] bg-[#A78295] hover:bg-[#331D2C] px-6 py-3 rounded-lg transition duration-300"
                        >
                            Join Premium Today
                        </Link>
                    </div>
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

export default Home;
