// src/App.jsx

import React, { useState } from 'react';
import ChannelList from './Components/ChannelList/ChannelList';
import MessageList from './Components/MessageList/MessageList';
import MessageInput from './Components/MessageInput/MessageInput';
import UserProfileSettings from './Components/UserProfileSettings/UserProfileSettings';
import './App.css';

// La URL base de tu AWS API Gateway se inyecta desde Vercel
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  // Simulación del usuario autenticado (clave para el POST y el UPDATE de perfil)
  const [currentUser, setCurrentUser] = useState({
    UserID: 'PabloRuival-001',
    username: 'Pablo (Test User)',
    isAuthenticated: true
  });

  // Estado para el canal actual, que afecta al MessageList
  const [currentChannelId, setCurrentChannelId] = useState('general');

  if (!currentUser.isAuthenticated) {
    return <h1>Por favor, inicia sesión.</h1>;
  }

  return (
    <div className="app-container">
      {/* Sidebar y lista de canales */}
      <div className="sidebar">
        <h2>CommLink</h2>
        <ChannelList
          currentChannelId={currentChannelId}
          onSelectChannel={setCurrentChannelId}
        />
        <hr />
        {/* Componente para probar la subida a S3 y la actualización de DynamoDB */}
        <UserProfileSettings
          currentUserId={currentUser.UserID}
        />
      </div>

      {/* Área principal del chat */}
      <div className="main-chat">
        <header className="chat-header">
          <h1>#{currentChannelId}</h1>
        </header>
        {/* MessageList consulta DynamoDB via Polling */}
        <MessageList channelId={currentChannelId} />

        {/* MessageInput envía POST a Lambda y dispara SNS */}
        <MessageInput
          channelId={currentChannelId}
          userId={currentUser.UserID}
        />
      </div>
    </div>
  );
}

export default App;
