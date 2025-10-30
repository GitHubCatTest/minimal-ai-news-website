import React, { useState } from 'react';

function ChatAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { sender: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed })
      });
      const data = await res.json();
      const botMsg = { sender: 'bot', text: data.reply || 'Sorry, something went wrong.' };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to server.' }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white shadow-lg rounded-lg z-50">
      <div className="h-48 overflow-y-auto p-2">
        {messages.map((m, idx) => (
          <div key={idx} className={`mb-1 text-sm ${m.sender === 'user' ? 'text-right' : ''}`}>
            <span className={`inline-block p-2 rounded ${m.sender === 'user' ? 'bg-cream' : 'bg-gray-200'}`}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex border-t">
        <input
          className="flex-grow p-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button className="px-3 py-2" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatAssistant;
