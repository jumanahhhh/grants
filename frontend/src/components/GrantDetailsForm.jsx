import React, { useState } from "react";
import axios from "../api/axiosConfig";

const GrantDetailsForm = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        businessType: "Non-profit",
        businessSize: "",
        sector: "",
        country: "",
        state: "",
        city: "",
        fundingPurpose: "",
        fundingAmount: "",
        yearsInOperation: "",
        registrationStatus: "",
        minorityOwnership: false,
        impactFocus: false,
        projectDeadline: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/update-profile", formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            alert("Details updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update details.");
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center max-w-4xl mx-auto p-6 bg-[#3F2E3E] rounded-lg shadow-xl">
                <h1 className="text-4xl font-semibold mb-6 text-center">Grant Application Form</h1>
                <form onSubmit={handleSubmit} className="w-full space-y-2">
                    {/* Business Details (2 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <h2 className="text-xl font-medium text-[#A78295]">Business Details</h2>
                            <input
                                type="text"
                                name="businessName"
                                placeholder="Business Name"
                                value={formData.businessName}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />
                            <select
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            >
                                <option value="">Select Type</option>
                                <option value="Non-profit">Non-profit</option>
                                <option value="For-profit">For-profit</option>
                                <option value="Startup">Startup</option>
                            </select>
                        </div>
                        <div className="space-y-4 mt-11">
                            <input
                                type="text"
                                name="businessSize"
                                placeholder="Size (e.g., 10 employees, $100k revenue)"
                                value={formData.businessSize}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />
                            <input
                                type="text"
                                name="sector"
                                placeholder="Sector (e.g., Healthcare, Technology)"
                                value={formData.sector}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />
                        </div>
                    </div>

                    {/* Location (2 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h2 className="text-xl font-medium text-[#A78295]">Location</h2>
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />
                                                        <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />
                        </div>
                        <div className="space-y-2 mt-9">
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />

                        </div>
                    </div>

                    {/* Grant Objectives (2 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h2 className="text-xl font-medium text-[#A78295]">Grant Objectives</h2>
                            <input
                                type="text"
                                name="fundingPurpose"
                                placeholder="Funding Purpose"
                                value={formData.fundingPurpose}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />
                        </div>
                        <div className="space-y-2 mt-9">
                            <input
                                type="number"
                                name="fundingAmount"
                                placeholder="Funding Amount ($)"
                                value={formData.fundingAmount}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />
                        </div>
                    </div>

                    {/* Eligibility Details (2 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h2 className="text-xl font-medium text-[#A78295]">Eligibility Details</h2>
                            <input
                                type="number"
                                name="yearsInOperation"
                                placeholder="Years in Operation"
                                value={formData.yearsInOperation}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            />
                        </div>
                        <div className="space-y-2 mt-9">
                            <select
                                name="registrationStatus"
                                value={formData.registrationStatus}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                            >
                                <option value="">Select Registration Status</option>
                                <option value="Incorporated">Incorporated</option>
                                <option value="Sole Proprietorship">Sole Proprietorship</option>
                            </select>
                        </div>
                    </div>

                    {/* Special Criteria (Single Column) */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-medium text-[#A78295]">Special Criteria</h2>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="minorityOwnership"
                                    checked={formData.minorityOwnership}
                                    onChange={handleChange}
                                    className="text-[#A78295]"
                                />
                                <span className="ml-2">Minority or underrepresented ownership</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="impactFocus"
                                    checked={formData.impactFocus}
                                    onChange={handleChange}
                                    className="text-[#A78295]"
                                />
                                <span className="ml-2">Environmental or social impact focus</span>
                            </label>
                        </div>
                        <input
                            type="date"
                            name="projectDeadline"
                            value={formData.projectDeadline}
                            onChange={handleChange}
                            className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-4 mt-6 rounded-lg bg-[#A78295] text-[#331D2C] hover:bg-[#331D2C] hover:text-[#EFE1D1] transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GrantDetailsForm;

// import React, { useState, useEffect } from "react";
// import axios from "../api/axiosConfig";

// const GrantDetailsForm = () => {
//     const [formData, setFormData] = useState({
//         businessName: "",
//         businessType: "Non-profit",
//         businessSize: "",
//         sector: "",
//         country: "",
//         state: "",
//         city: "",
//         fundingPurpose: "",
//         fundingAmount: "",
//         yearsInOperation: "",
//         registrationStatus: "",
//         minorityOwnership: false,
//         impactFocus: false,
//         projectDeadline: "",
//     });

//     const [isEditMode, setIsEditMode] = useState(false);

//     // Fetch existing data when component mounts
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("/get-grant-details", {
//                     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//                 });
//                 setFormData(response.data); // Populate form with existing data
//             } catch (error) {
//                 console.error("Error fetching grant details", error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("/update-grant-details", formData, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             alert("Grant details updated successfully!");
//             setIsEditMode(false); // Switch to view mode after successful update
//         } catch (error) {
//             console.error("Error updating grant details", error);
//             alert("Failed to update details.");
//         }
//     };

//     return (
//         <div>
//             <div className="flex flex-col items-center max-w-4xl mx-auto p-6 bg-[#3F2E3E] rounded-lg shadow-xl">
//                 <h1 className="text-4xl font-semibold mb-6 text-center">Grant Application Form</h1>
//                 <form onSubmit={handleSubmit} className="w-full space-y-2">
//                     {/* Business Details (2 Columns) */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="space-y-4">
//                             <h2 className="text-xl font-medium text-[#A78295]">Business Details</h2>
//                             <input
//                                 type="text"
//                                 name="businessName"
//                                 placeholder="Business Name"
//                                 value={formData.businessName}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode} // Disable in view mode
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                             <select
//                                 name="businessType"
//                                 value={formData.businessType}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             >
//                                 <option value="">Select Type</option>
//                                 <option value="Non-profit">Non-profit</option>
//                                 <option value="For-profit">For-profit</option>
//                                 <option value="Startup">Startup</option>
//                             </select>
//                         </div>
//                         <div className="space-y-4 mt-11">
//                             <input
//                                 type="text"
//                                 name="businessSize"
//                                 placeholder="Size (e.g., 10 employees, $100k revenue)"
//                                 value={formData.businessSize}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                             <input
//                                 type="text"
//                                 name="sector"
//                                 placeholder="Sector (e.g., Healthcare, Technology)"
//                                 value={formData.sector}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                         </div>
//                     </div>

//                     {/* Location (2 Columns) */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <h2 className="text-xl font-medium text-[#A78295]">Location</h2>
//                             <input
//                                 type="text"
//                                 name="country"
//                                 placeholder="Country"
//                                 value={formData.country}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                             <input
//                                 type="text"
//                                 name="city"
//                                 placeholder="City"
//                                 value={formData.city}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                         </div>
//                         <div className="space-y-2 mt-9">
//                             <input
//                                 type="text"
//                                 name="state"
//                                 placeholder="State"
//                                 value={formData.state}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                         </div>
//                     </div>

//                     {/* Grant Objectives (2 Columns) */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <h2 className="text-xl font-medium text-[#A78295]">Grant Objectives</h2>
//                             <input
//                                 type="text"
//                                 name="fundingPurpose"
//                                 placeholder="Funding Purpose"
//                                 value={formData.fundingPurpose}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                         </div>
//                         <div className="space-y-2 mt-9">
//                             <input
//                                 type="number"
//                                 name="fundingAmount"
//                                 placeholder="Funding Amount ($)"
//                                 value={formData.fundingAmount}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                         </div>
//                     </div>

//                     {/* Eligibility Details (2 Columns) */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <h2 className="text-xl font-medium text-[#A78295]">Eligibility Details</h2>
//                             <input
//                                 type="number"
//                                 name="yearsInOperation"
//                                 placeholder="Years in Operation"
//                                 value={formData.yearsInOperation}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             />
//                         </div>
//                         <div className="space-y-2 mt-9">
//                             <select
//                                 name="registrationStatus"
//                                 value={formData.registrationStatus}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={!isEditMode}
//                                 className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                             >
//                                 <option value="">Select Registration Status</option>
//                                 <option value="Incorporated">Incorporated</option>
//                                 <option value="Sole Proprietorship">Sole Proprietorship</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Special Criteria (Single Column) */}
//                     <div className="space-y-2">
//                         <h2 className="text-xl font-medium text-[#A78295]">Special Criteria</h2>
//                         <div className="flex items-center space-x-4">
//                             <label className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     name="minorityOwnership"
//                                     checked={formData.minorityOwnership}
//                                     onChange={handleChange}
//                                     disabled={!isEditMode}
//                                     className="text-[#A78295]"
//                                 />
//                                 <span className="ml-2">Minority or underrepresented ownership</span>
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     name="impactFocus"
//                                     checked={formData.impactFocus}
//                                     onChange={handleChange}
//                                     disabled={!isEditMode}
//                                     className="text-[#A78295]"
//                                 />
//                                 <span className="ml-2">Environmental or social impact focus</span>
//                             </label>
//                         </div>
//                         <input
//                             type="date"
//                             name="projectDeadline"
//                             value={formData.projectDeadline}
//                             onChange={handleChange}
//                             disabled={!isEditMode}
//                             className="w-full p-4 rounded-lg bg-[#EFE1D1] text-[#331D2C] focus:outline-none focus:ring-2 focus:ring-[#A78295]"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full p-4 mt-6 rounded-lg bg-[#A78295] text-[#331D2C] hover:bg-[#331D2C] hover:text-[#EFE1D1] transition duration-300"
//                     >
//                         {isEditMode ? "Update" : "Submit"}
//                     </button>

//                     {/* Edit Button */}
//                     {!isEditMode && (
//                         <button
//                             type="button"
//                             onClick={() => setIsEditMode(true)}
//                             className="w-full p-4 mt-4 rounded-lg bg-[#A78295] text-[#331D2C] hover:bg-[#331D2C] hover:text-[#EFE1D1] transition duration-300"
//                         >
//                             Edit
//                         </button>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default GrantDetailsForm;
