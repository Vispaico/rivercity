import { useState, useEffect } from 'react';

async function sendMessage(message) {
  const res = await fetch('/api/rivercity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  return data.response;
}

const languages = [
  { code: 'en', text: "Hi, I'm Huyen, wanna chat?" },
  { code: 'vi', text: "Chào! Tôi là Huyen, cùng trò chuyện nhé?" },
  { code: 'de', text: "Hallo! Ich bin Huyen, möchtest du chatten?" },
  { code: 'ja', text: "こんにちは！私はHuyenです、チャットしますか？" },
  { code: 'pl', text: "Cześć! Jestem Huyen, chcesz pogadać?" },
  { code: 'ko', text: "안녕하세요! 저는 Huyen입니다, 대화할까요?" },
  { code: 'es', text: "¡Hola! Soy Huyen, ¿quieres charlar?" },
  { code: 'zh', text: "你好！我是Huyen，想聊天吗？" },
  { code: 'ru', text: "Привет! Я Huyen, хочешь поболтать?" },
  { code: 'fr', text: "Salut! Je suis Huyen, tu veux discuter?" },
  { code: 'it', text: "Ciao! Sono Huyen, vuoi chiacchierare?" },
  { code: 'pt', text: "Olá! Sou Huyen, quer conversar?" },
  { code: 'hi', text: "नमस्ते! मैं Huyen हूँ, बात करना चाहते हो?" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 3000); // Change language every 3 seconds

    return () => clearInterval(interval);
  }, []);

  async function send() {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const response = await sendMessage(input);
    setMessages(prev => [...prev, { sender: 'agent', text: response }]);
    setInput('');
  }

  return (
    <div>
      {!open && (
        <>
          {/* Avatar button */}
          <img
            src="/bot/avatar.webp"
            alt="Chat"
            className="fixed bottom-24 right-4 sm:right-14 w-24 h-24 sm:w-44 sm:h-44 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setOpen(true)}
          />

          {/* Chat band */}
          <div className="fixed bottom-10 right-4 sm:right-14 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 sm:px-6 py-2 rounded-full shadow-lg animate-pulse cursor-pointer hover:from-blue-600 hover:to-blue-800 transition-all max-w-[calc(100vw-2rem)] sm:max-w-xs"
               onClick={() => setOpen(true)}>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-sm font-medium">{languages[currentLanguage].text}</span>
              <span className="text-lg">💬</span>
            </div>
          </div>
        </>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-0 sm:right-4 w-full sm:w-80 max-h-[60vh] sm:max-h-[500px] bg-white shadow-2xl rounded-lg sm:rounded-l-lg flex flex-col border border-gray-200 border-l-0 sm:border-l">

          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/bot/avatar.webp" alt="Huyen" className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-semibold text-sm">Huyen</p>
                <p className="text-xs opacity-90">RiverCity Bike Rentals</p>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="text-white hover:opacity-80 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[300px]">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-8">
                Hello! How can I help you with bike rentals in Haiphong?
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.sender === 'user' ? 'text-right' : 'text-left'}>
                <div className={
                  m.sender === 'user' 
                    ? 'bg-blue-600 text-white inline-block px-3 py-2 rounded-lg max-w-[80%] text-sm' 
                    : 'bg-gray-100 text-gray-800 inline-block px-3 py-2 rounded-lg max-w-[80%] text-sm'
                }>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-3 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about rentals..."
            />
            <button 
              onClick={send} 
              disabled={!input.trim()}
              className="ml-2 bg-blue-600 text-white px-4 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
