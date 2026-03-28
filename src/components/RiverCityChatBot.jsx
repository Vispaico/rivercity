import React, { useState, useEffect } from 'react';
import './RiverCityChatBot.css';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'fr', name: 'Français' },
  { code: 'pl', name: 'Polski' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국인' },
  { code: 'zh', name: '中国人' },
  { code: 'ru', name: 'Русский' },
];

export default function RiverCityChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-detect language
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const supported = SUPPORTED_LANGUAGES.map(l => l.code);
    setCurrentLanguage(supported.includes(browserLang) ? browserLang : 'en');
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage], 
          userLanguage: currentLanguage 
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble right now. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all active:scale-95"
      >
        🏍️
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[640px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">

          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <img 
                src="/bot/avatar.webp"
                alt="Huyen"
                className="w-11 h-11 rounded-2xl object-cover border-2 border-white/50"
              />
              <div>
                <p className="font-semibold text-lg">Huyen</p>
                <p className="text-xs opacity-90">Haiphong, Vietnam</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-white/20 text-white text-sm rounded-lg px-3 py-1 border border-white/30 focus:outline-none"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl leading-none opacity-80 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                Hello! How can I help you with your trip in Haiphong?
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about rentals, transport, Cat Ba..."
                className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white px-6 rounded-full disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 py-2 bg-gray-50 border-t">
            RiverCity Bike Rentals • Haiphong, Vietnam
          </div>
        </div>
      )}
    </>
  );
}