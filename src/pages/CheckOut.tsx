import { getBillingDetail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const result = useQuery({
        queryKey: ["order", id!],
        enabled: !!id,
        queryFn: () => getBillingDetail(id!)
    });

    if (result.isLoading) return <>Loading</>
    
    if (result.isError) return <>Error</>

    if (result.data!.paid) {
        navigate("/home");
    }

    const formatter = new Intl.NumberFormat('vi-VI'); // 'en-US' specifies the locale for comma separators
    

    return (
        <>
            <div className="min-h-[100vh] py-30 mx-10">
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-5" role="alert">
                    <p className="font-bold">Lưu ý</p>
                    <p>Giao dịch có thể mất 5 đến 10 phút để được xác nhận, nếu vẫn không được xác nhận thanh toán, xin hãy liên hệ admin qua email: admin@example.com để được hỗ trợ</p>
                </div>
                <div className="lg:flex items-start">
                    <div className="w-full items-center justify-center flex flex-col">
                        <div className="text-xl font-bold text-white pb-5">Quét mã qua ứng dụng Ngân hàng/ Ví điện tử</div>
                        <img src={`https://qr.sepay.vn/img?acc=962477K8RC&bank=BIDV&amount=${result.data!.amount}&des=Giao%20dich%20${result.data!.transactionCode}`} className="rounded" />
                    </div>
                    <div className="space-y-4 lg:w-[30%] rounded-lg p-6 bg-[#2f3147]">
                        <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">{formatter.format(result.data!.amount)} VND</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Số tháng đăng ký</dt>
                                <dd className="text-base font-medium text-green-500">1</dd>
                            </dl>

                            {/* <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                            </dl> */}

                            {/* <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                            </dl> */}
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">{formatter.format(result.data!.amount)} VND</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;