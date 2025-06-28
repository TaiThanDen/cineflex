import React from "react";
import { useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/lib/api";


const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createOrder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess(data, _variables, _context) {
      navigate(`/checkout/${data.id}`);
    },
  });

  const handleUpgradeClick = async () => {
    await mutation.mutateAsync();
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
        <div
          className="bg-[#1e1e2f] text-white rounded-2xl shadow-lg p-8 border hover:text-purple-400 border-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-2">Freemium</h2>
          <p className="text-4xl font-bold text-purple-500 mb-4">
            0 VND
            <span className="text-base font-normal text-gray-400"> /mo</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              Access to almost all shows and movies
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              A generous amount of ads
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              Like a whole lot of ads
            </li>
          </ul>
          <button
            disabled
            className={`w-full py-2 rounded-lg font-medium transition bg-gray-700 text-gray-400 cursor-not-allowed`}
          >
            Current plan
          </button>
        </div>

        <div
          className="bg-[#1e1e2f] text-white rounded-2xl shadow-lg p-8 border hover:text-purple-400 border-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-2">Freemium</h2>
          <p className="text-4xl font-bold text-purple-500 mb-4">
            100,000 VND
            <span className="text-base font-normal text-gray-400"> /mo</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              All Free plan features
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              Access to exclusive content
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              No ads at all (except for some shows)
            </li>
          </ul>
          <button
            onClick={() => {handleUpgradeClick()}}
            className={`w-full py-2 rounded-lg font-medium transition bg-purple-500 text-white cursor-pointer`}
          >
            Upgrade plan
          </button>
        </div>
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
