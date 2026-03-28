import React, { useState, useEffect, useRef } from 'react';
import './RiverCityChatBot.css';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Spanish' },
  { code: 'it', name: 'Italian' },
  { code: 'fr', name: 'French' },
  { code: 'pl', name: 'Polish' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'ru', name: 'Russian' },
];

export default function RiverCityChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-detect browser language
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const supported = SUPPORTED_LANGUAGES.map(l => l.code);
    const detected = supported.includes(browserLang) ? browserLang : 'en';
    setCurrentLanguage(detected);
  }, []);

  // Voice Recognition Setup
  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = currentLanguage === 'zh' ? 'zh-CN' : currentLanguage;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setInputValue('');
      sendMessage(transcript);
    };

    recognitionRef.current.onerror = () => setIsListening(false);

    return () => recognitionRef.current?.abort();
  }, [currentLanguage]);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const toggleVoice = () => setIsVoiceEnabled(!isVoiceEnabled);

  const startVoiceInput = () => {
    if (!recognitionRef.current) return;
    setIsListening(true);
    recognitionRef.current.start();
  };

  const handleLanguageChange = (e) => {
    setCurrentLanguage(e.target.value);
  };

  const sendMessage = async (text) => {
    const trimmed = (text ?? inputValue).trim();
    if (!trimmed) return;

    const outgoing = [...messages, { role: 'user', content: trimmed }];
    setMessages(outgoing);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: outgoing, userLanguage: currentLanguage }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      const reply = typeof data?.content === 'string' ? data.content : '';
      setMessages([...outgoing, { role: 'assistant', content: reply || 'Got it!'}]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...outgoing, { role: 'assistant', content: 'Sorry, I hit a snag. Please try again.' }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all active:scale-95"
      >
        🏍️
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[640px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 rivercity-chat-window">

          {/* Header */}
          <div className="rivercity-chat-header text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/bot/avatar.webp" 
                alt="RiverBot"
                className="w-11 h-11 rounded-2xl object-cover border-2 border-white/50"
              />
              <div>
                <p className="font-semibold text-lg">Huyen</p>
                <p className="text-xs opacity-90">Haiphong, Vietnam</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <select
                value={currentLanguage}
                onChange={handleLanguageChange}
                className="bg-white/20 text-white text-sm rounded-lg px-3 py-1 border border-white/30 focus:outline-none"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

              {/* Voice Toggle */}
              <button
                onClick={toggleVoice}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                  isVoiceEnabled ? 'bg-white text-blue-600' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {isVoiceEnabled ? '🔊 Voice On' : '🔇 Voice'}
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-2xl leading-none opacity-80 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 relative overflow-hidden rivercity-chat-container">
            <div className="h-full overflow-y-auto p-4 space-y-3 pi-chat-messages">
              {messages.length === 0 && (
                <div className="pi-message-assistant text-sm">
                  Hi! Ask me about rentals, Cat Ba ferry schedules, transport, or anything about Haiphong.
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={`${msg.role}-${idx}`}
                  className={`${msg.role === 'user' ? 'pi-message-user ml-auto text-sm whitespace-pre-line' : 'pi-message-assistant text-sm whitespace-pre-line'}`}
                >
                  {msg.content}
                </div>
              ))}

              {isSending && (
                <div className="pi-message-assistant text-sm opacity-80">
                  Thinking...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="pi-chat-input flex items-end gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
              <button
                type="submit"
                disabled={isSending}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow disabled:bg-blue-300"
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </form>

            {/* Voice Input Button */}
            {isVoiceEnabled && (
              <button
                onClick={startVoiceInput}
                disabled={isListening}
                className={`absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-xl transition-all ${
                  isListening 
                    ? 'bg-red-500 voice-listening' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isListening ? '🎤' : '🎙️'}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 py-3 bg-gray-50 border-t">
            RiverCity Bike Rentals • Haiphong, Vietnam
          </div>
        </div>
      )}
    </>
  );
}