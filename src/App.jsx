
import React, { useState } from 'react';
import ChannelList from './Components/ChannelList/ChannelList';
import MessageList from './Components/MessageList/MessageList';
import MessageInput from './Components/MessageInput/MessageInput';
import UserProfileSettings from './Components/UserProfileSettings/UserProfileSettings';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({
    UserID: 'PabloRuival-001',
    username: 'Pablo (Test User)',
    isAuthenticated: true
  });

  const [currentChannelId, setCurrentChannelId] = useState('general');

  if (!currentUser.isAuthenticated) {
    return <h1>Por favor, inicia sesión.</h1>;
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>CommLink</h2>
        <ChannelList
          currentChannelId={currentChannelId}
          onSelectChannel={setCurrentChannelId}
        />
        <hr />
        <UserProfileSettings
          currentUserId={currentUser.UserID}
        />
      </div>
      <div className="main-chat">
        <header className="chat-header">
          <h1>#{currentChannelId}</h1>
        </header>
        <MessageList channelId={currentChannelId} />

        <MessageInput
          channelId={currentChannelId}
          userId={currentUser.UserID}
        />
      </div>
    </div>
  );
}

export default App