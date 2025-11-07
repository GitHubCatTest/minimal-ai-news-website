import React, { useState } from 'react';
import { PaperAirplaneIcon, SparkleIcon } from './icons.js';

function ChatAssistant({ isDarkMode }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const themeState = isDarkMode ? 'dark' : 'light';

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;
    const userMsg = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      const botMsg = { sender: 'bot', text: data.reply || 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error connecting to server.' }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div data-theme={themeState} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-72 max-w-[85vw] rounded-2xl border border-black/5 bg-surface shadow-card transition-all duration-200 ease-out dark:border-white/10 dark:bg-slate-950">
          <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-white/10 dark:text-slate-400">
            <span>Assistant</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-black/5 px-2 py-0.5 text-[10px] font-medium text-slate-500 transition-colors duration-200 ease-out hover:border-accent-blue hover:text-accent-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 dark:border-white/10 dark:text-slate-300"
            >
              Close
            </button>
          </div>
          <div className="flex max-h-60 flex-col gap-2 overflow-y-auto px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
            {messages.length === 0 && (
              <p className="rounded-xl border border-dashed border-black/10 bg-white/70 p-3 text-xs text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
                Ask about today&apos;s headlines and I&apos;ll highlight what matters for markets.
              </p>
            )}
            {messages.map((message, idx) => (
              <div
                key={`${message.sender}-${idx}`}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-subtle transition-colors duration-200 ease-out ${
                    message.sender === 'user'
                      ? 'bg-accent-blue/10 text-accent-blue'
                      : 'bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-100'
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-black/5 bg-white/80 px-3 py-3 dark:border-white/10 dark:bg-slate-900">
            <input
              className="flex-grow rounded-xl border border-transparent bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-accent-blue focus:outline-none focus:ring-0 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a topic..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={isSending}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-slate-700 shadow-subtle transition-transform duration-200 ease-out hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
            >
              <PaperAirplaneIcon className="h-4 w-4 -translate-y-[1px]" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle news assistant"
        aria-expanded={isOpen}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white text-accent-blue shadow-card transition-transform duration-200 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 dark:border-white/10 dark:bg-slate-900 dark:text-accent-blue"
      >
        <span className="flex h-9 w-9 items-center justify-center">
          <SparkleIcon className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}

export default ChatAssistant;
