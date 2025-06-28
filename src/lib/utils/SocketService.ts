// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

// // Connect to this endpoint
// const SOCKET_URL = 'https://cineflex-api.onrender.com/ws';

// let stompClient: Client;

// export const connectWebSocket = (onMessageReceived: (message: string) => void, id: string) => {
//     const socket = new SockJS(SOCKET_URL);
//     stompClient = new Client({
//         webSocketFactory: () => socket,
//         reconnectDelay: 5000,
//         onConnect: () => {
//             console.log('Connected');

//             // Subscribe to a topic
//             stompClient.subscribe(`/bill.${id}`, (message) => {
//                 onMessageReceived(message.body);
//             });
//         },
//         onStompError: (frame) => {
//             console.error('Broker error', frame);
//         },
//     });

//     stompClient.activate();
// };

// export const disconnectWebSocket = () => {
//     if (stompClient && stompClient.connected) {
//         stompClient.deactivate();
//     }
// };