
import React from 'react';


const MOCK_CHANNELS = [
    { id: 'general', name: '# General' },
    { id: 'soporte', name: '# Soporte Técnico' },
    { id: 'random', name: '# Random' },
    { id: 'privado-juan', name: '@ Juan Perez' },
];

function ChannelList({ currentChannelId, onSelectChannel }) {
    return (
        <nav className="channel-list">
            <h3>Canales</h3>
            <ul>
                {MOCK_CHANNELS.map((channel) => (
                    <li
                        key={channel.id}
                        className={channel.id === currentChannelId ? 'active' : ''}
                        onClick={() => onSelectChannel(channel.id)}
                    >
                        {channel.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default ChannelList;