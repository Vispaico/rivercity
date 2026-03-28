import React, { useState, useEffect } from 'react';
import './RiverCityChatBot.css';

export default function RiverCityChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Auto detect language
  useEffect(() => {
    const lang = navigator.language.split('-')[0];
    setCurrentLanguage(['en','vi','de','es','it','fr','pl','ja','ko','zh','ru'].includes(lang) ? lang : 'en');
  }, []);

  const speak = (text) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'zh' ? 'zh-CN' : currentLanguage;
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (text) => {
    if (!text || isLoading) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userLanguage: currentLanguage
        }),
      });

      const data = await res.json();
      const botReply = data.content || "Sorry, I didn't understand.";

      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
      speak(botReply);                    // Speak every time
    } catch (err) {
      console.error(err);
      const errorMsg = "Sorry, I'm having trouble right now.";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert("Voice input is not supported in your browser.");
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = currentLanguage === 'zh' ? 'zh-CN' : currentLanguage;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (transcript) sendMessage(transcript);
    };
    recognition.start();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl"
      >
        🏍️
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[640px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">

          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/bot/avatar.webp" alt="Huyen" className="w-10 h-10 rounded-2xl" />
              <div>
                <p className="font-semibold">Huyen</p>
                <p className="text-xs opacity-90">Haiphong, Vietnam</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-2xl">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 mt-10">Hello! How can I help you today?</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[85%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && <p className="text-gray-500">Thinking...</p>}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask anything..."
                className="flex-1 border rounded-full px-4 py-3"
              />
              <button onClick={() => sendMessage(input)} className="bg-blue-600 text-white px-6 rounded-full">
                Send
              </button>
            </div>
          </div>

          {/* Voice Button */}
          <button
            onClick={handleVoiceInput}
            className="absolute bottom-28 right-8 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
          >
            🎤
          </button>
        </div>
      )}
    </>
  );
}