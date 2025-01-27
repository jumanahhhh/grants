import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const GrantRecommendations = ({ userId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`/recommendations/${userId}`);
                // console.log("API Response:", response.data);  // Log the API response
                setRecommendations(response.data.recommendations);
            } catch (err) {
                console.error("Error fetching recommendations:", err);
                setError('Failed to fetch recommendations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [userId]);

    if (loading) {
        return <p>Loading recommendations...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[#F5F5F5] rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Recommended Grants</h2>
            {recommendations.length === 0 ? (
                <p>No matching grants found.</p>
            ) : (
                <ul className="space-y-4">
                    {recommendations.map((grant) => (
                        <li key={grant._id} className="p-4 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">{grant.name}</h3>
                            <p><strong>Type:</strong> {grant.type}</p>
                            <p><strong>Sector:</strong> {grant.sector.join(', ')}</p>
                            <p><strong>Location:</strong> {grant.location.country}, {grant.location.province}, {grant.location.city}</p>
                            <p><strong>Funding Amount:</strong> ${grant.fundingAmountRange.min} - ${grant.fundingAmountRange.max}</p>
                            <p><strong>Deadline:</strong> {new Date(grant.deadline).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GrantRecommendations;
