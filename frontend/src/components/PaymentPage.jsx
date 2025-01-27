// import React, { useState } from "react";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "../api/axiosConfig";
// import { useNavigate } from "react-router-dom";
// // Replace with your Stripe publishable key
// const stripePromise = loadStripe("pk_test_51Qg2S4GM1mS4jrdWMTthWuWmf5JCCcMnVcZJR1nAxVMGyCyRgjjc5CPp9bZIizu1BvGtD5X61OK1X5e8pTyCks1i000ozbK3o9");

// const PaymentPage = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm />
//         </Elements>
//     );
// };

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [errorMessage, setErrorMessage] = useState("");
//     const [isProcessing, setIsProcessing] = useState(false);
//     const navigate = useNavigate();


//     const handlePayment = async (e) => {
//         e.preventDefault();
//         setIsProcessing(true);
//         const userId = localStorage.getItem('_id');

//         try {
//             // Step 1: Get client secret from backend
//             const { data } = await axios.post("/create-checkout-session", {
//                 amount: 120, // Amount in CAD
//                 // userId
//             });

//             const clientSecret = data.clientSecret;

//             // Step 2: Confirm payment on the frontend
//             const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardElement),
//                 },
//             });

//             if (error) {
//                 setErrorMessage(error.message || "An error occurred during payment.");
//                 setIsProcessing(false);
//                 return;
//             }

//             if (paymentIntent.status === "succeeded") {
//                 console.log("Received userId:", userId);
//                 await axios.post("/payment/success", { userId: userId });
//                 alert("Payment successful!");
//                 navigate("/grants");
//             }
            
//         } catch (err) {
//             console.error("Error:", err);
//             setErrorMessage(err.response?.data?.error || "An error occurred.");
//         } finally {
//             setIsProcessing(false);
//         }
//     };


//     return (
//         <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
//             <h2>Complete Your Payment</h2>
//             <form onSubmit={handlePayment}>
//                 <div style={{ marginBottom: "20px" }}>
//                     <label>Card Details</label>
//                     <CardElement options={{ hidePostalCode: true }} />
//                 </div>
//                 {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//                 <button
//                     type="submit"
//                     disabled={!stripe || isProcessing}
//                     style={{
//                         background: isProcessing ? "#ddd" : "#28a745",
//                         color: "#fff",
//                         padding: "10px 15px",
//                         border: "none",
//                         borderRadius: "5px",
//                         cursor: "pointer",
//                     }}
//                 >
//                     {isProcessing ? "Processing..." : "Pay 120 CAD"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default PaymentPage;


import React, { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../api/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51Qg2S4GM1mS4jrdWMTthWuWmf5JCCcMnVcZJR1nAxVMGyCyRgjjc5CPp9bZIizu1BvGtD5X61OK1X5e8pTyCks1i000ozbK3o9");

const PaymentPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get the email from the URL
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            if (!email) {
                throw new Error("Email not found in URL");
            }

            // Step 1: Get client secret from backend
            const { data } = await axios.post("/create-checkout-session", {
                amount: 120, // Amount in CAD
            });

            const clientSecret = data.clientSecret;

            // Step 2: Confirm payment on the frontend
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                setErrorMessage(error.message || "An error occurred during payment.");
                setIsProcessing(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                // Step 3: Inform backend about successful payment using email
                await axios.post("/payment/success", { email: email }); // Send email to the backend
                alert("Payment successful!");
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Error:", err);
            setErrorMessage(err.response?.data?.error || "An error occurred.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
<div className="bg-gradient-to-br from-[#331D2C] to-[#3F2E3E] min-h-screen flex justify-center items-center py-16">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full flex">
                {/* Left Section */}
                <div className="flex flex-col justify-center items-start w-1/2 p-4">
                    <h2 className="text-2xl font-semibold text-[#331D2C] mb-4">Secure Payment</h2>
                    <p className="text-lg text-[#3F2E3E]">Complete your payment securely through Stripe.</p>
                    <p className="text-lg text-[#3F2E3E] mt-2">100% encrypted and safe.</p>
                </div>

                {/* Right Section - Payment Form */}
                <div className="w-1/2 p-4">
                    <form onSubmit={handlePayment} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-lg text-[#331D2C]">Card Details</label>
                            <CardElement options={{ hidePostalCode: true }} className="p-2 border border-[#3F2E3E] rounded-lg" />
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={!stripe || isProcessing}
                            className={`w-full py-3 rounded-lg text-white ${isProcessing ? 'bg-gray-400' : 'bg-[#A78295] hover:bg-[#331D2C]'} transition duration-300`}
                        >
                            {isProcessing ? 'Processing...' : 'Pay 120 CAD'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
