import React, { useEffect, useState } from 'react';
import MessageItem from '../MessageItem/MessageItem'; 


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useMessagePolling(channelId) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!channelId || !API_BASE_URL) return;

            const url = `${API_BASE_URL}/messages/${channelId}`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setMessages(data); 
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); 
        return () => clearInterval(interval); 
    }, [channelId]); 

    return messages;
}


function MessageList({ channelId }) {
    const messages = useMessagePolling(channelId); 

    return (
        <div className="message-list">
            {messages.length === 0 && <p>Cargando mensajes o el canal está vacío...</p>}
            {messages.map((msg) => (
                <MessageItem key={msg.Timestamp} message={msg} /> 
            ))}
        </div>
    );
}

export default MessageList;