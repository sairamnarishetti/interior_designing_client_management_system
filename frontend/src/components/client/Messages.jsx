import React, { useState } from 'react';
import './styles/Messages.css';

const sampleChats = [
  {
    id: 1,
    name: 'Sarah Johnson',
    time: '10:30 AM',
    message: 'Can we review the design options?',
    fullConversation: [
      { from: 'user', text: 'Hi there! Ready to review the designs?', time: '10:30 AM' },
      { from: 'client', text: 'Yes! I have some great options for you.', time: '10:32 AM' },
    ],
  },
  {
    id: 2,
    name: 'Michael Chen',
    time: 'Yesterday',
    message: "I've uploaded the new mockups",
    fullConversation: [],
  },
  {
    id: 3,
    name: 'Modern Furniture Co.',
    time: 'Yesterday',
    message: 'Your order has been shipped',
    fullConversation: [],
  },
  {
    id: 4,
    name: 'Emma Thompson',
    time: 'Mon',
    message: "Let's discuss the project timeline",
    fullConversation: [],
  },
  {
    id: 5,
    name: 'David Wilson',
    time: 'Sun',
    message: 'The design looks amazing!',
    fullConversation: [],
  },
];

const Messages = () => {
  const [chats, setChats] = useState(sampleChats);
  const [selectedChat, setSelectedChat] = useState(sampleChats[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const formatTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const getAutoReply = (message) => {
    const lower = message.toLowerCase();

    if (lower.includes("design")) {
      return "Absolutely! Would you like to see more modern or classic styles?";
    }

    if (lower.includes("price") || lower.includes("cost") || lower.includes("budget")) {
      return "Our standard design packages start from $500. I can share a detailed breakdown if you'd like.";
    }

    if (lower.includes("timeline") || lower.includes("time") || lower.includes("schedule")) {
      return "The estimated completion time is around 2-4 weeks depending on scope.";
    }

    if (lower.includes("material") || lower.includes("furnishing")) {
      return "We use high-quality, durable materials sourced from top vendors.";
    }

    if (lower.includes("thanks") || lower.includes("thank you")) {
      return "You're welcome! Always happy to help.";
    }

    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      return "Hey there! How can I assist you today?";
    }

    if (lower.includes("location") || lower.includes("visit") || lower.includes("office")) {
      return "We're based in New York. Let me know if you'd like to schedule a site visit.";
    }

    if (lower.includes("call") || lower.includes("phone") || lower.includes("email")) {
      return "You can reach me at support@interiordesign.com or call (123) 456-7890.";
    }

    return "Got it! Let me check and get back to you shortly.";
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const time = formatTime();

    const userMsg = { from: 'user', text: newMessage, time };
    const autoReplyMsg = {
      from: 'client',
      text: getAutoReply(newMessage),
      time: formatTime(),
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat.id) {
        const updatedConversation = [...chat.fullConversation, userMsg];
        return { ...chat, fullConversation: updatedConversation, message: newMessage, time };
      }
      return chat;
    });

    setChats(updatedChats);
    const currentChat = updatedChats.find(chat => chat.id === selectedChat.id);
    if (currentChat) setSelectedChat(currentChat);
    setNewMessage('');

    setTimeout(() => {
      const replyChats = updatedChats.map(chat => {
        if (chat.id === selectedChat.id) {
          const updatedConversation = [...chat.fullConversation, userMsg, autoReplyMsg];
          return { ...chat, fullConversation: updatedConversation, time: autoReplyMsg.time };
        }
        return chat;
      });

      setChats(replyChats);
      const repliedChat = replyChats.find(chat => chat.id === selectedChat.id);
      if (repliedChat) setSelectedChat(repliedChat);
    }, 800);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <h2>Messages</h2>
        <p className="subtitle">Chat with clients, designers & vendors</p>
        <input
          type="text"
          placeholder="Search messages..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="chat-list">
          {filteredChats.map((chat) => (
            <li
              key={chat.id}
              className={`chat-item ${selectedChat.id === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="avatar">🧑‍🎨</div>
              <div className="chat-info">
                <div className="chat-header">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <div className="chat-preview">{chat.message}</div>
              </div>
            </li>
          ))}
        </ul>
        <button className="new-message">+ New Message</button>
      </div>

      <div className="messages-chat">
        <div className="chat-header-top">
          <div>
            <strong>{selectedChat.name}</strong>
            <p className="chat-role">Client</p>
          </div>
          <div className="chat-actions">
            <button>📞</button>
            <button>📹</button>
            <button>👤</button>
            <button>⋮</button>
          </div>
        </div>

        <div className="chat-body">
          {selectedChat.fullConversation.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.from === 'user' ? 'sent' : 'received'}`}
            >
              <p>{msg.text}</p>
              <span className="time">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <button>➕</button>
          <button>📎</button>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-btn" onClick={handleSendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
