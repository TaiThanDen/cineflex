import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/lib/api";
import Subscription from "@/context/Subscription";


const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createOrder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess(data, _variables, _context) {
      navigate(`/checkout/${data.id}`);
    },
  });


  const subscription = useContext(Subscription);


  const handleUpgradeClick = async () => {
    await mutation.mutateAsync();
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-20 px-4 pt-40">
      <h1 className="text-4xl font-bold font-sans text-white text-center mb-4">
        Gói Đăng Ký
      </h1>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
        Chọn gói phù hợp với bạn. Nâng cấp để loại bỏ quảng cáo và mở khóa
        nội dung độc quyền.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div
          className="bg-[#1e1e2f] text-white rounded-2xl shadow-lg p-8 border hover:text-purple-400 border-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-2">Miễn Phí</h2>
          <p className="text-4xl font-bold text-purple-500 mb-4">
            0 VND
            <span className="text-base font-normal text-gray-400"> /tháng</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              Truy cập hầu hết các chương trình và phim
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              Có nhiều quảng cáo
            </li>
          </ul>
          {!(subscription) &&
            <button
              disabled
              className={`w-full py-2 rounded-lg font-medium transition bg-gray-700 text-gray-400 cursor-not-allowed`}
            >
              Gói hiện tại
            </button>}
        </div>

        <div
          className="bg-[#1e1e2f] text-white rounded-2xl shadow-lg p-8 border hover:text-purple-400 border-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-2">Cao Cấp</h2>
          <p className="text-4xl font-bold text-purple-500 mb-4">
            100,000 VND
            <span className="text-base font-normal text-gray-400"> /tháng</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              Tất cả tính năng của gói Miễn phí
            </li>
            <li className="flex items-center text-gray-300">
              <FaCheckCircle className="text-green-400 w-5 h-5 mr-2" />
              Không có quảng cáo
            </li>
          </ul>
          <button
            disabled={subscription}
            onClick={() => { handleUpgradeClick() }}
            className={`w-full py-2 rounded-lg disabled:cursor-not-allowed font-medium transition disabled:bg-gray-700 bg-purple-500 text-white cursor-pointer`}
          >
            {subscription ? 'Gói hiện tại' : 'Nâng cấp gói'}
          </button>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-10">
        Phương thức thanh toán 100% bảo mật với{" "}
        <strong className="text-purple-500">KHÔNG</strong> hoàn tiền.
      </p>
    </div>
  );
};

export default SubscriptionPlans;
