import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newMessage = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thanks for your message! A human agent will be with you shortly. For now, I'm just a placeholder. :)",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-[100]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }} 
      >
        <Button
          onClick={toggleChat}
          className="rounded-full p-4 h-16 w-16 bg-blue-600 hover:bg-blue-700 text-white shadow-xl"
          aria-label="Open Chat"
        >
          <MessageSquare size={28} />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px',
              width: isMinimized ? 'auto' : '360px'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed bottom-24 right-6 z-[99] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            style={{
              maxHeight: 'calc(100vh - 100px)',
            }}
          >
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold text-lg">RiverCity Support</h3>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700" onClick={toggleMinimize}>
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700" onClick={toggleChat}>
                  <X size={20} />
                </Button>
              </div>
            </header>
            
            {!isMinimized && (
              <>
                <ScrollArea className="flex-grow p-4 space-y-3 h-[350px]">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${
                        msg.sender === "bot" ? "justify-start" : "justify-end"
                      } mb-2`}
                    >
                      <div
                        className={`max-w-[75%] p-3 rounded-lg text-sm ${
                          msg.sender === "bot"
                            ? "bg-gray-100 text-gray-800 rounded-bl-none"
                            : "bg-blue-500 text-white rounded-br-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </ScrollArea>

                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-gray-200 flex items-center space-x-2 bg-gray-50"
                >
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow focus:border-blue-500"
                    autoFocus
                  />
                  <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                    <Send size={18} />
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;