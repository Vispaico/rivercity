import React, { useState, useEffect, useRef } from 'react';
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
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);

  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-detect language
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const supported = SUPPORTED_LANGUAGES.map(l => l.code);
    setCurrentLanguage(supported.includes(browserLang) ? browserLang : 'en');
  }, []);

  // Voice Recognition
  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = currentLanguage === 'zh' ? 'zh-CN' : currentLanguage;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (transcript && chatRef.current) {
        // Simulate sending the voice message
        const sendEvent = new CustomEvent('send', {
          detail: { messages: [{ role: 'user', content: transcript }] }
        });
        chatRef.current.dispatchEvent(sendEvent);
      }
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => setIsListening(false);
  }, [currentLanguage]);

  const toggleVoice = () => setIsVoiceEnabled(!isVoiceEnabled);

  const startVoiceInput = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleLanguageChange = (e) => {
    setCurrentLanguage(e.target.value);
  };

  // Mount the ChatPanel web component
  useEffect(() => {
    if (!isOpen || !chatRef.current) return;

    chatRef.current.innerHTML = '';

    const chatPanel = document.createElement('chat-panel');

    chatPanel.setAttribute('placeholder', 'Ask about rentals, Cat Ba ferry, transport...');
    chatPanel.setAttribute('show-thinking', 'true');
    if (isVoiceEnabled) chatPanel.setAttribute('enable-voice', 'true');

    // Forward send event to our backend
    chatPanel.addEventListener('send', async (e) => {
      const messages = e.detail?.messages || [];
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            messages, 
            userLanguage: currentLanguage 
          }),
        });

        if (!res.ok) throw new Error('Failed');
        const data = await res.json();

        // Send response back to the chat panel
        const responseEvent = new CustomEvent('response', {
          detail: { content: data.content }
        });
        chatPanel.dispatchEvent(responseEvent);
      } catch (err) {
        console.error(err);
        const errorEvent = new CustomEvent('response', {
          detail: { content: "Sorry, I'm having trouble right now. Please try again." }
        });
        chatPanel.dispatchEvent(errorEvent);
      }
    });

    chatRef.current.appendChild(chatPanel);

    return () => {
      if (chatRef.current) chatRef.current.innerHTML = '';
    };
  }, [isOpen, isVoiceEnabled, currentLanguage]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all active:scale-95"
      >
        🏍️
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[640px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 rivercity-chat-window">

          {/* Header */}
          <div className="rivercity-chat-header text-white p-4 flex items-center justify-between flex-shrink-0">
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
                onChange={handleLanguageChange}
                className="bg-white/20 text-white text-sm rounded-lg px-3 py-1 border border-white/30 focus:outline-none"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <button
                onClick={toggleVoice}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                  isVoiceEnabled ? 'bg-white text-blue-600' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {isVoiceEnabled ? '🔊 On' : '🔇 Off'}
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
          <div 
            ref={chatRef}
            className="flex-1 overflow-hidden bg-gray-50 rivercity-chat-messages"
          />

          {/* Voice Button */}
          {isVoiceEnabled && (
            <button
              onClick={startVoiceInput}
              disabled={isListening}
              className={`absolute bottom-20 right-6 w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-xl z-10 transition-all ${
                isListening ? 'bg-red-500 voice-listening' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isListening ? '🎤' : '🎙️'}
            </button>
          )}

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 py-3 bg-gray-50 border-t flex-shrink-0">
            RiverCity Bike Rentals • Haiphong, Vietnam
          </div>
        </div>
      )}
    </>
  );
}