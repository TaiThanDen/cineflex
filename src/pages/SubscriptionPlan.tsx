import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

interface Plan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  isCurrent?: boolean;
}

const plans: Plan[] = [
  {
    name: "Freemium",
    price: "$0",
    features: [
      "Access to almost all shows and movies",
      "A generous amount of ads",
      "Like a whole lot of ads",
    ],
    cta: "Current Plan",
    isCurrent: true,
  },
  {
    name: "Premium",
    price: "$4.99",
    features: [
      "All Free plan features",
      "Access to exclusive content",
      "No ads at all (except for some shows)",
    ],
    cta: "Upgrade Now",
  },
];

const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();

  const handleUpgradeClick = (plan: Plan) => {
    navigate("/payment", {
      state: {
        planName: plan.name,
        price: plan.price,
        billingCycle: "Monthly",
        userEmail: "user@example.com",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-20 px-4">
      <h1 className="text-4xl font-bold font-sans text-white text-center mb-4">
        Subscription Plans
      </h1>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
        Choose the plan that's right for you. Upgrade to remove ads and unlock
        exclusive content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-[#1e1e2f] text-white rounded-2xl shadow-lg p-8 border hover:text-purple-400 border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-4xl font-bold text-purple-500 mb-4">
              {plan.price}
              <span className="text-base font-normal text-gray-400"> /mo</span>
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.isCurrent}
              onClick={() => !plan.isCurrent && handleUpgradeClick(plan)}
              className={`w-full py-2 rounded-lg font-medium transition ${
                plan.isCurrent
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 mt-10">
        100% secure payment method with{" "}
        <strong className="text-purple-500">NO</strong> money back guarantee.
      </p>

      <div className="flex justify-center mt-6">
        <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
