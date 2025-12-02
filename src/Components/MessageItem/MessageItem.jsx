import React, { useState, useEffect } from 'react';
import fetchUserProfileWithCache  from '../../services/userServices'; 

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

        if(message.UserID) {
            loadProfile();
        }
    }, [message.UserID]); 

    return (
        <div className="message">
            <img 
                src={authorProfile.profilePhotoURL || '/default-avatar.png'} 
                alt={authorProfile.username} 
                className="avatar" 
            />
            <div className="message-content">
                <strong className="username">{authorProfile.username}</strong>
                <span className="timestamp">{new Date(message.Timestamp).toLocaleTimeString()}</span>
                <p>{message.Text}</p>
            </div>
        </div>
    );
}

export default MessageItem;