
import React, { useState, useEffect } from 'react';
import { fetchUserProfileWithCache } from '../../services/useServices';
import './MessageItem.css';

function MessageItem({ message }) {
    const [authorProfile, setAuthorProfile] = useState({
        username: message.UserID,
        profilePhotoURL: ''
    });

    useEffect(() => {
        const loadProfile = async () => {
            const profile = await fetchUserProfileWithCache(message.UserID);
            setAuthorProfile(profile);
        };

        if (message.UserID) {
            loadProfile();
        }
    }, [message.UserID]);

    const displayTime = new Date(message.Timestamp).toLocaleTimeString();

    return (
        <div className="message">
            <img
                src={authorProfile.profilePhotoURL || '/question-mark-1019820_1280.webp'}
                alt={authorProfile.username}
                className="avatar"
            />
            <div className="message-content">
                <strong className="username">{authorProfile.username}</strong>
                <span className="timestamp">{displayTime}</span>
                <p>{message.MessageText}</p>
            </div>
        </div>
    );
}

export default MessageItem;