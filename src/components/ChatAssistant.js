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
        <div className="w-80 max-w-[90vw] rounded-3xl border border-white/25 bg-white/70 shadow-frosted backdrop-blur-2xl transition-all duration-300 ease-in-out dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center justify-between border-b border-white/40 px-4 pb-3 pt-4 text-[11px] font-medium uppercase tracking-[0.4em] text-slate-600/80 dark:border-white/10 dark:text-slate-300/80">
            <span>News Assistant</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/40 bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 transition-all duration-200 ease-in-out hover:border-white/60 hover:text-ink dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
            >
              Close
            </button>
          </div>
          <div className="flex max-h-60 flex-col gap-2 overflow-y-auto px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
            {messages.length === 0 && (
              <p className="rounded-2xl border border-dashed border-white/40 bg-white/50 p-3 text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                Ask about today&apos;s headlines and I&apos;ll highlight the essentials for you.
              </p>
            )}
            {messages.map((message, idx) => (
              <div
                key={`${message.sender}-${idx}`}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-inner backdrop-blur-xl transition-all duration-300 ease-in-out ${
                    message.sender === 'user'
                      ? 'bg-accent/40 text-ink dark:bg-accent/60'
                      : 'bg-white/75 text-slate-800 dark:bg-white/10 dark:text-slate-200'
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-white/30 bg-white/50 px-3 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <input
              className="flex-grow rounded-2xl border border-transparent bg-white/80 px-3 py-2 text-sm text-slate-700 transition-all duration-300 ease-in-out placeholder:text-slate-400 focus:border-accent/60 focus:outline-none focus:ring-0 dark:bg-white/10 dark:text-slate-100 dark:placeholder:text-slate-400"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-white/90 text-slate-700 shadow-inner transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
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
        className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/70 px-4 py-3 text-sm font-medium text-ink shadow-frosted backdrop-blur-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/10 dark:text-white"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/50 via-white/50 to-transparent text-ink shadow-inner transition-transform duration-300 ease-in-out group-hover:scale-105 dark:text-white">
          <SparkleIcon className="h-5 w-5" />
        </span>
        <span className="hidden sm:block">Ask Simply</span>
      </button>
    </div>
  );
}

export default ChatAssistant;
