import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // Store latest notifications to be accessible by any component
    const [latestNotification, setLatestNotification] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        // Skip connection if not logged in
        if (!userId || !token) {
            console.log("WebSocket: Paused, waiting for user authentication.");
            return;
        }

        const socketUrl = 'http://localhost:8081/ws'; // Match your backend port

        const stompClient = new Client({
            // Using SockJS fallback due to potential CORS/Proxy issues with raw ws://
            webSocketFactory: () => new SockJS(socketUrl),
            connectionHeaders: {
                Authorization: `Bearer ${token}`
            },
            debug: (str) => {
                // Comment out in production
                // console.log("[STOMP Debug] " + str);
            },
            reconnectDelay: 5000, // Auto reconnect
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = (frame) => {
            console.log('Connected to WebSocket server:', frame);
            setIsConnected(true);

            // Subscribe to user-specific notifications
            // The queue matches the NotificationService in Spring Boot
            stompClient.subscribe(`/user/${userId}/queue/notifications`, (message) => {
                if (message.body) {
                    const parsedMessage = JSON.parse(message.body);
                    console.log("[WebSocket Event Received]", parsedMessage);
                    setLatestNotification(parsedMessage);
                    // You could also trigger a Toast notification right here
                }
            });

            // Subscribe to global broadcasts (optional)
            stompClient.subscribe('/topic/broadcasts', (message) => {
                if (message.body) {
                    console.log("[WebSocket Global Broadcast]", JSON.parse(message.body));
                }
            });
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.activate();
        setClient(stompClient);

        // Cleanup on unmount
        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []); // Re-run if a custom auth context trigger changes

    // Helper method for components to send messages upstream if needed
    const sendMessage = (destination, body) => {
        if (client && client.connected) {
            client.publish({ destination, body: JSON.stringify(body) });
        } else {
            console.error("Cannot send message, WebSocket not connected");
        }
    };

    return (
        <WebSocketContext.Provider value={{ isConnected, latestNotification, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
