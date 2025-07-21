import { getBillingDetail } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { toast } from "react-toastify";


const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const stompClientRef = useRef<Client | null>(null);
    const queryClient = useQueryClient();
    

    const result = useQuery({
        queryKey: ["order", id!],
        enabled: !!id,
        queryFn: () => getBillingDetail(id!)
    });

    useEffect(()=> {
        if (!id) return;
        const socket = new SockJS(`${(import.meta.env.VITE_WEBSOCKET_APU_URL ?? "http://localhost:8080/ws")}`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.subscribe(`/bill.${id}`, (response) => {
                    if (response.body === 'PAID') {
                        queryClient.invalidateQueries({
                            queryKey: ["user-subscription"]
                        })
                        toast("Thanh toán thành công, cảm ơn bạn đã ủng hộ!;");
                        navigate("/home");
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
        stompClient.activate();
        stompClientRef.current = stompClient;
        // if (!id) return;

        // connectWebSocket((message) => {
        //     console.log(message);
        // }, id);

        // return () => {
        //     disconnectWebSocket();
        // }

        return () => {
            stompClient.deactivate();
        };
    }, [id])

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