import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const GrantForm = () => {
  const [formData, setFormData] = useState({
    grantName: "",
    fundingAmount: "",
    applicationDeadline: "",
    eligibilityRequirements: {
      businessType: "",
      sector: "",
      location: { country: "", state: "", city: "" },
      fundingPurpose: "",
      minYearsInOperation: "",
      registrationStatus: "",
    },
    specialCriteria: { minorityOwned: false, environmentalFocus: false },
    createdAt: new Date().toISOString().slice(0, 10),
  });

  const [grants, setGrants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGrantId, setEditingGrantId] = useState(null);

  // Fetch all grants on component mount
  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const response = await axios.get("/admin/grants");
        setGrants(response.data);
      } catch (error) {
        console.error("Error fetching grants:", error);
      }
    };
    fetchGrants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("location.")) {
      const [_, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        eligibilityRequirements: {
          ...prev.eligibilityRequirements,
          location: { ...prev.eligibilityRequirements.location, [key]: value },
        },
      }));
    } else if (name.includes("specialCriteria.")) {
      const [_, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        specialCriteria: {
          ...prev.specialCriteria,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name.includes("eligibilityRequirements.")) {
      const [_, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        eligibilityRequirements: {
          ...prev.eligibilityRequirements,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/admin/grants/${editingGrantId}`, formData);
        alert("Grant updated successfully!");
      } else {
        await axios.post("/admin/grants", formData);
        alert("Grant created successfully!");
      }
      setFormData({
        grantName: "",
        fundingAmount: "",
        applicationDeadline: "",
        eligibilityRequirements: {
          businessType: "",
          sector: "",
          location: { country: "", state: "", city: "" },
          fundingPurpose: "",
          minYearsInOperation: "",
          registrationStatus: "",
        },
        specialCriteria: { minorityOwned: false, environmentalFocus: false },
        createdAt: new Date().toISOString().slice(0, 10),
      });
      setIsEditing(false);
      setEditingGrantId(null);
      fetchGrants();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit grant details.");
    }
  };

  const handleEdit = (grant) => {
    setFormData(grant);
    setIsEditing(true);
    setEditingGrantId(grant._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this grant?")) {
      try {
        await axios.delete(`/admin/grants/${id}`);
        alert("Grant deleted successfully!");
        fetchGrants();
      } catch (error) {
        console.error("Error deleting grant:", error);
        alert("Failed to delete grant.");
      }
    }
  };

  const fetchGrants = async () => {
    try {
      const response = await axios.get("/admin/grants");
      setGrants(response.data);
    } catch (error) {
      console.error("Error fetching grants:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#3F2E3E]">
      <h1 className="text-center text-white text-2xl font-bold mb-6">Admin Page</h1>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Grant Name</label>
              <input
                type="text"
                name="grantName"
                value={formData.grantName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Funding Amount</label>
              <input
                type="number"
                name="fundingAmount"
                value={formData.fundingAmount}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
    
          {/* Eligibility Requirements */}
          <fieldset className="border border-gray-300 p-4 rounded-lg bg-gray-50">
            <legend className="font-semibold text-lg text-gray-700">Eligibility Requirements</legend>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Business Type</label>
                <select
                  name="eligibilityRequirements.businessType"
                  value={formData.eligibilityRequirements.businessType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Non-profit">Non-profit</option>
                  <option value="For-profit">For-profit</option>
                  <option value="Startup">Startup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Sector</label>
                <input
                  type="text"
                  name="eligibilityRequirements.sector"
                  value={formData.eligibilityRequirements.sector}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Country</label>
                <input
                  type="text"
                  name="location.country"
                  value={formData.eligibilityRequirements.location.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">State</label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.eligibilityRequirements.location.state}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.eligibilityRequirements.location.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Funding Purpose</label>
                <input
                  type="text"
                  name="eligibilityRequirements.fundingPurpose"
                  value={formData.eligibilityRequirements.fundingPurpose}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Minimum Years in Operation</label>
                <input
                  type="number"
                  name="eligibilityRequirements.minYearsInOperation"
                  value={formData.eligibilityRequirements.minYearsInOperation}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Registration Status</label>
                <input
                  type="text"
                  name="eligibilityRequirements.registrationStatus"
                  value={formData.eligibilityRequirements.registrationStatus}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </fieldset>
    
          {/* Special Criteria */}
          <fieldset className="border border-gray-300 p-4 rounded-lg bg-gray-50">
            <legend className="font-semibold text-lg text-gray-700">Special Criteria</legend>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Minority Owned</label>
                <input
                  type="checkbox"
                  name="specialCriteria.minorityOwned"
                  checked={formData.specialCriteria.minorityOwned}
                  onChange={handleChange}
                  className="mr-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Environmental Focus</label>
                <input
                  type="checkbox"
                  name="specialCriteria.environmentalFocus"
                  checked={formData.specialCriteria.environmentalFocus}
                  onChange={handleChange}
                  className="mr-2"
                />
              </div>
            </div>
          </fieldset>
    
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
            >
              {isEditing ? "Update Grant" : "Submit Grant"}
            </button>
          </div>
        </form>
    
        {/* Existing Grants Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Existing Grants</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Grant Name</th>
                <th className="border p-2">Funding Amount</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {grants.map((grant) => (
                <tr key={grant._id} className="hover:bg-gray-50">
                  <td className="border p-2">{grant.grantName}</td>
                  <td className="border p-2">{grant.fundingAmount}</td>
                  <td className="border p-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-yellow-400"
                      onClick={() => handleEdit(grant)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-400"
                      onClick={() => handleDelete(grant._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
    

};

export default GrantForm;


