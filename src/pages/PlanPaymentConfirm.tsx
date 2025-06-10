import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PlanPaymentConfirm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planName, price, billingCycle, userEmail } = location.state || {};

  if (!planName || !price || !billingCycle || !userEmail) {
    return (
      <div className="text-white text-center mt-20">
        <p>Missing payment details. Please go back and choose a plan again.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-red-500 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleVNPayPayment = () => {
    // Replace this with your VNPay integration logic
    alert("Redirecting to VNPay for payment...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="bg-[#1e1e2f] text-white p-10 rounded-3xl shadow-2xl w-full max-w-xl">
        <h1 className="text-2xl font-sans font-semibold mb-4 text-center">
          Confirm Your Subscription
        </h1>

        <div className="border border-gray-600 rounded-lg p-6 space-y-4">
          <div className="flex justify-between text-gray-300">
            <span>Plan:</span>
            <span className="font-bold font-sans text-white">{planName}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Billing Cycle:</span>
            <span className="font-semibold font-sans text-white">
              {billingCycle}
            </span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Email:</span>
            <span className="font-semibold font-sans text-white">
              {userEmail}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold font-sans text-white border-t pt-4 border-gray-600">
            <span>Total:</span>
            <span>{price}</span>
          </div>
        </div>

        <button
          onClick={handleVNPayPayment}
          className="mt-8 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-90 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Pay with VNPAY
        </button>

        <button
          onClick={() => navigate("/plans")}
          className="mt-4 w-full text-sm text-gray-400 hover:text-white"
        >
          Go Back to Plans
        </button>
      </div>
    </div>
  );
};

export default PlanPaymentConfirm;
