
import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function MessageInput({ channelId, userId }) {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() || !channelId || !userId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channelId: channelId,
                    userId: userId,
                    messageText: text
                })
            });

            if (response.ok) {
                setText('');
            } else {
                console.error("Error al enviar mensaje.", response.status);
            }
        } catch (error) {
            console.error("Error de red al enviar mensaje:", error);
        }
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Escribe en #${channelId}...`}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default MessageInput;