// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axiosConfig";
// import GrantDetailsForm from "./GrantDetailsForm";

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [matchedGrants, setMatchedGrants] = useState([]); // State to store matched grants

//     // Fetch user profile
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token'); // Retrieve JWT from local storage
//                 const response = await axios.get('/user/profile', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setUser(response.data);
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//                 if (error.response && error.response.status === 401) {
//                     navigate('/login'); // Redirect to login if not authenticated
//                 }
//             }
//         };
//         fetchUserProfile();
//     }, [navigate]);

//     // Fetch matched grants when user is fetched
//     useEffect(() => {
//         if (user) {
//             const fetchMatchedGrants = async () => {
//                 try {
//                     const token = localStorage.getItem('token'); // Retrieve JWT from local storage
//                     const response = await axios.get(`/match-grants/${user._id}`, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     setMatchedGrants(response.data);
//                 } catch (error) {
//                     console.error('Error fetching matched grants:', error);
//                 }
//             };
//             fetchMatchedGrants();
//         }
//     }, [user]); // Re-fetch matched grants when user data is available

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/login');
//     };

//     const handleBackToHome = () => {
//         navigate('/');
//     };

//     return (
//         <div className="bg-gradient-to-br from-[#331D2C] to-[#3F2E3E] min-h-screen text-[#EFE1D1] ">
//             <nav className="flex items-center justify-between p-4 bg-[#3F2E3E]">
//                 <div className="text-2xl font-bold text-[#A78295] cursor-pointer" onClick={handleBackToHome}>
//                     GrantsHub
//                 </div>
//                 <div>
//                     <button
//                         onClick={handleLogout}
//                         className="px-4 py-2 bg-[#A78295] text-[#331D2C] rounded-lg hover:bg-[#331D2C] hover:text-[#EFE1D1] transition duration-300"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </nav>

//             <div className="mt-8 px-4">
//                 {user ? (
//                     <div className="text-center mb-8">
//                         <h1 className="text-3xl font-semibold mb-2">Welcome, {user.name}</h1>
//                         <div className="flex flex-col items-center gap-4">
//                             <h2 className="text-lg text-[#A78295]">Email: {user.email}</h2>
//                             <p className="text-lg text-[#EFE1D1]">Payment Status: {user.paymentStatus ? 'Paid' : 'Unpaid'}</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <p>Loading your details...</p>
//                 )}
//             </div>
            

//             <div className="flex flex-wrap px-4 mb-8 pl-20 pr-20">
//                 {/* Left Section: Form */}
//                 <div className="w-full md:w-2/5 p-4 mb-6">
//                     <GrantDetailsForm user={user} />
//                 </div>

//                 {/* Right Section: Grants */}
//                 <div className="w-full md:w-3/5 p-4 space-y-6">
//                     <div className="flex justify-center mb-8">
//                         {user && (
//                             <div className="bg-[#A78295] text-[#331D2C] p-8 rounded-lg shadow-lg">
//                                 <h2 className="text-3xl font-semibold text-center mb-6">Your Business Details</h2>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                     <div className="space-y-4">
//                                         <p><strong>Business Name:</strong> {user.businessDetails?.name || 'N/A'}</p>
//                                         <p><strong>Business Type:</strong> {user.businessDetails?.type || 'N/A'}</p>
//                                         <p><strong>Business Size:</strong> {user.businessDetails?.size || 'N/A'}</p>
//                                         <p><strong>Sector:</strong> {user.businessDetails?.sector || 'N/A'}</p>
//                                         <p><strong>Funding Purpose:</strong> {user.grantObjectives?.purpose || 'N/A'}</p>
//                                         <p><strong>Years in Operation:</strong> {user.eligibilityDetails?.yearsInOperation || 'N/A'}</p>
//                                         <p><strong>Minority Ownership:</strong> {user.specialCriteria?.minorityOwnership ? 'Yes' : 'No'}</p>
//                                     </div>
//                                     <div className="space-y-4">
//                                         <p><strong>Location:</strong> {user.location?.city}, {user.location?.state}, {user.location?.country || 'N/A'}</p>
//                                         <p><strong>Funding Amount:</strong> ${user.grantObjectives?.fundingAmount || 'N/A'}</p>
//                                         <p><strong>Registration Status:</strong> {user.eligibilityDetails?.registrationStatus || 'N/A'}</p>
//                                         <p><strong>Impact Focus:</strong> {user.specialCriteria?.impactFocus ? 'Yes' : 'No'}</p>
//                                         <p><strong>Project Deadline:</strong> {user.specialCriteria?.projectDeadline || 'N/A'}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     {/* Grants Section */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mb-16">
//                         {matchedGrants.length > 0 ? (
//                             matchedGrants.map((grant, index) => (
//                                 <div key={index} className="bg-[#A78295] text-[#331D2C] p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300">
//                                     <h3 className="text-xl font-semibold mb-2">{grant.grantName}</h3>
//                                     <p className="text-lg">Amount: ${grant.fundingAmount}</p>
//                                     <p className="mt-3">{grant.description}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No matching grants found.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <footer className="bg-[#3F2E3E] text-[#EFE1D1] py-6 mt-16">
//                 <div className="text-center">
//                     <p className="text-lg font-semibold">© 2025 GrantsHub. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Dashboard;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axiosConfig";
// import GrantDetailsForm from "./GrantDetailsForm";

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [matchedGrants, setMatchedGrants] = useState([]); // State to store matched grants

//     // Filter and search states
//     const [sectorFilter, setSectorFilter] = useState(""); // For filtering by sector
//     const [fundingFilter, setFundingFilter] = useState(""); // For filtering by funding amount
//     const [deadlineFilter, setDeadlineFilter] = useState(""); // For filtering by deadline
//     const [searchQuery, setSearchQuery] = useState(""); // For general search

//     // State to manage favorites
//     const [favorites, setFavorites] = useState([]);

//     // Fetch user profile
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const token = localStorage.getItem("token"); // Retrieve JWT from local storage
//                 const response = await axios.get("/user/profile", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("Error fetching user profile:", error);
//                 if (error.response && error.response.status === 401) {
//                     navigate("/login"); // Redirect to login if not authenticated
//                 }
//             }
//         };
//         fetchUserProfile();
//     }, [navigate]);

//     // Fetch matched grants when user is fetched
//     useEffect(() => {
//         if (user) {
//             const fetchMatchedGrants = async () => {
//                 try {
//                     const token = localStorage.getItem("token");
//                     const response = await axios.get(`/match-grants/${user._id}`, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     setMatchedGrants(response.data);
//                 } catch (error) {
//                     console.error("Error fetching matched grants:", error);
//                 }
//             };
//             fetchMatchedGrants();
//         }
//     }, [user]);

//     // Filter grants
//     const filteredGrants = matchedGrants.filter((grant) => {
//         return (
//             (!sectorFilter || (grant.sector && grant.sector.toLowerCase().includes(sectorFilter))) &&
//             (!fundingFilter || grant.fundingAmount <= fundingFilter) &&
//             (!deadlineFilter || new Date(grant.applicationDeadline) <= new Date(deadlineFilter))
//         );
//     });
    
//     const searchedGrants = filteredGrants.filter((grant) =>
//         grant.grantName.toLowerCase().includes(searchQuery)
//     );
    
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     const handleBackToHome = () => {
//         navigate("/");
//     };

//     return (
//         <div className="bg-gradient-to-br from-[#331D2C] to-[#3F2E3E] min-h-screen text-[#EFE1D1]">
//             <nav className="flex items-center justify-between p-4 bg-[#3F2E3E]">
//                 <div
//                     className="text-2xl font-bold text-[#A78295] cursor-pointer"
//                     onClick={handleBackToHome}
//                 >
//                     GrantsHub
//                 </div>
//                 <div>
//                     <button
//                         onClick={handleLogout}
//                         className="px-4 py-2 bg-[#A78295] text-[#331D2C] rounded-lg hover:bg-[#331D2C] hover:text-[#EFE1D1] transition duration-300"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </nav>

//             <div className="mt-8 px-4">
//                 {user ? (
//                     <div className="text-center mb-8">
//                         <h1 className="text-3xl font-semibold mb-2">Welcome, {user.name}</h1>
//                         <div className="flex flex-col items-center gap-4">
//                             <h2 className="text-lg text-[#A78295]">Email: {user.email}</h2>
//                             <p className="text-lg text-[#EFE1D1]">Payment Status: {user.paymentStatus ? "Paid" : "Unpaid"}</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <p>Loading your details...</p>
//                 )}
//             </div>

//             {/* Filter Inputs */}
//             <div className="flex justify-between items-center mb-6 px-4">
//                 <input
//                     type="text"
//                     placeholder="Search by sector..."
//                     onChange={(e) => setSectorFilter(e.target.value.toLowerCase())}
//                     className="border p-2 rounded w-1/3"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Max funding amount"
//                     onChange={(e) => setFundingFilter(e.target.value)}
//                     className="border p-2 rounded w-1/3"
//                 />
//                 <input
//                     type="date"
//                     onChange={(e) => setDeadlineFilter(e.target.value)}
//                     className="border p-2 rounded w-1/3"
//                 />
//             </div>

//             {/* Search Input */}
//             <input
//                 type="text"
//                 placeholder="Search grants..."
//                 onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
//                 className="border p-2 rounded w-full mb-4"
//             />

//             {/* Display Grants */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
//                 {searchedGrants.length > 0 ? (
//                     searchedGrants.map((grant, index) => (
//                         <div
//                             key={index}
//                             className="bg-[#A78295] text-[#331D2C] p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300"
//                         >
//                             <h3 className="text-xl font-semibold mb-2">{grant.grantName}</h3>
//                             <p className="text-lg">Amount: ${grant.fundingAmount}</p>
//                             <p className="mt-3">{grant.description}</p>
//                             <button
//                                 onClick={() => setFavorites((prev) => [...prev, grant])}
//                                 className="bg-green-500 text-white p-2 rounded mt-2"
//                             >
//                                 Save to Favorites
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No matching grants found.</p>
//                 )}
//             </div>

//             {/* Favorites Section */}
//             <div className="mt-8">
//                 <h2 className="text-xl font-bold mb-4">Saved Grants</h2>
//                 {favorites.map((favorite, index) => (
//                     <div key={index} className="bg-gray-200 p-4 rounded-lg mb-4">
//                         <h3>{favorite.grantName}</h3>
//                         <p>Funding: ${favorite.fundingAmount}</p>
//                         <p>{favorite.description}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import GrantDetailsForm from "./GrantDetailsForm";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [matchedGrants, setMatchedGrants] = useState([]); // State to store matched grants

    // Filter and search states
    const [sectorFilter, setSectorFilter] = useState(""); // For filtering by sector
    const [fundingFilter, setFundingFilter] = useState(""); // For filtering by funding amount
    const [deadlineFilter, setDeadlineFilter] = useState(""); // For filtering by deadline
    const [searchQuery, setSearchQuery] = useState(""); // For general search

    // State to manage favorites
    const [favorites, setFavorites] = useState([]);

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve JWT from local storage
                const response = await axios.get("/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                if (error.response && error.response.status === 401) {
                    navigate("/login"); // Redirect to login if not authenticated
                }
            }
        };
        fetchUserProfile();
    }, [navigate]);

    // Fetch matched grants when user is fetched
    useEffect(() => {
        if (user) {
            const fetchMatchedGrants = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`/match-grants/${user._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setMatchedGrants(response.data);
                } catch (error) {
                    console.error("Error fetching matched grants:", error);
                }
            };
            fetchMatchedGrants();
        }
    }, [user]);

    // Filter grants
    const filteredGrants = matchedGrants.filter((grant) => {
        return (
            (!sectorFilter || (grant.sector && grant.sector.toLowerCase().includes(sectorFilter))) &&
            (!fundingFilter || grant.fundingAmount <= fundingFilter) &&
            (!deadlineFilter || new Date(grant.applicationDeadline) <= new Date(deadlineFilter))
        );
    });

    const searchedGrants = filteredGrants.filter((grant) =>
        grant.grantName.toLowerCase().includes(searchQuery)
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/logout");
    };

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div className="bg-gradient-to-br from-[#331D2C] to-[#3F2E3E] min-h-screen text-[#EFE1D1]">
            <nav className="flex items-center justify-between p-4 bg-[#3F2E3E]">
                <div
                    className="text-2xl font-bold text-[#A78295] cursor-pointer"
                    onClick={handleBackToHome}
                >
                    GrantsHub
                </div>
                <div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-[#A78295] text-[#331D2C] rounded-lg hover:bg-[#331D2C] hover:text-[#EFE1D1] transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="mt-8 px-4">
                {user ? (
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-semibold mb-2">Welcome, {user.name}</h1>
                        <div className="flex flex-col items-center gap-4">
                            <h2 className="text-lg text-[#A78295]">Email: {user.email}</h2>
                            <p className="text-lg text-[#EFE1D1]">Payment Status: {user.paymentStatus ? "Paid" : "Unpaid"}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading your details...</p>
                )}
            </div>

            <div className="flex flex-wrap px-4 mb-8 pl-20 pr-20">
                {/* Left Section: Form */}
                <div className="w-full md:w-2/5 p-4 mb-6">
                    <GrantDetailsForm user={user} />
                </div>

                {/* Right Section: Grants */}
                <div className="w-full md:w-3/5 p-4 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <input
                            type="text"
                            placeholder="Search by sector..."
                            onChange={(e) => setSectorFilter(e.target.value.toLowerCase())}
                            className="border p-2 rounded w-1/3"
                        />
                        <input
                            type="number"
                            placeholder="Max funding amount"
                            onChange={(e) => setFundingFilter(e.target.value)}
                            className="border p-2 rounded w-1/3"
                        />
                        <input
                            type="date"
                            onChange={(e) => setDeadlineFilter(e.target.value)}
                            className="border p-2 rounded w-1/3"
                        />
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search grants..."
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                        className="border p-2 rounded w-full mb-4"
                    />
                    <div className="flex justify-center mb-8">
                        {user && (
                            <div className="bg-[#A78295] text-[#331D2C] p-8 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-semibold text-center mb-6">Your Business Details</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <p><strong>Business Name:</strong> {user.businessDetails?.name || 'N/A'}</p>
                                        <p><strong>Business Type:</strong> {user.businessDetails?.type || 'N/A'}</p>
                                        <p><strong>Business Size:</strong> {user.businessDetails?.size || 'N/A'}</p>
                                        <p><strong>Sector:</strong> {user.businessDetails?.sector || 'N/A'}</p>
                                        <p><strong>Funding Purpose:</strong> {user.grantObjectives?.purpose || 'N/A'}</p>
                                        <p><strong>Years in Operation:</strong> {user.eligibilityDetails?.yearsInOperation || 'N/A'}</p>
                                        <p><strong>Minority Ownership:</strong> {user.specialCriteria?.minorityOwnership ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <p><strong>Location:</strong> {user.location?.city}, {user.location?.state}, {user.location?.country || 'N/A'}</p>
                                        <p><strong>Funding Amount:</strong> ${user.grantObjectives?.fundingAmount || 'N/A'}</p>
                                        <p><strong>Registration Status:</strong> {user.eligibilityDetails?.registrationStatus || 'N/A'}</p>
                                        <p><strong>Impact Focus:</strong> {user.specialCriteria?.impactFocus ? 'Yes' : 'No'}</p>
                                        <p><strong>Project Deadline:</strong> {user.specialCriteria?.projectDeadline || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Display Grants */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mb-16">
                        {searchedGrants.length > 0 ? (
                            searchedGrants.map((grant, index) => (
                                <div
                                    key={index}
                                    className="bg-[#A78295] text-[#331D2C] p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300"
                                >
                                    <h3 className="text-xl font-semibold mb-2">{grant.grantName}</h3>
                                    <p className="text-lg">Amount: ${grant.fundingAmount}</p>
                                    <p className="mt-3">{grant.description}</p>
                                    <button
                                        onClick={() => setFavorites((prev) => [...prev, grant])}
                                        className="bg-green-500 text-white p-2 rounded mt-2"
                                    >
                                        Save to Favorites
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No matching grants found.</p>
                        )}
                    </div>

                    {/* Favorites Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Saved Grants</h2>
                        {favorites.map((favorite, index) => (
                            <div key={index} className="bg-pink-200 p-4 rounded-lg mb-4 text-black">
                                <h3>{favorite.grantName}</h3>
                                <p>Funding: ${favorite.fundingAmount}</p>
                                <p>{favorite.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="bg-[#3F2E3E] text-[#EFE1D1] py-6 mt-16">
                <div className="text-center">
                    <p className="text-lg font-semibold">© 2025 GrantsHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
