import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const supportiveResponses = [
  "I'm here for you. Remember, tough times don't last, but tough people do. 🌈",
  "Take a deep breath. You're doing the best you can, and that's enough. 🧘‍♀️",
  "Would you like a journaling prompt? ✍️ 'What are three things that made you smile today?'",
  "Feeling overwhelmed? Try the 4-7-8 breathing technique. Inhale 4s, hold 7s, exhale 8s. 🌬️",
  "You're not alone. It's okay to ask for help. ❤️",
];

const distressKeywords = ["panic", "anxiety", "suicidal", "depressed", "help", "distress", "hopeless"];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi there! 🌟 I'm Sahayak, your companion. How is your heart today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    const lowerInput = input.toLowerCase();
    setInput("");
    setIsTyping(true);

    const distressDetected = distressKeywords.some(keyword => lowerInput.includes(keyword));

    setTimeout(() => {
      setIsTyping(false);
      if (distressDetected) {
        setMessages(prev => [
          ...prev,
          { type: "bot", text: "I'm listening, and I hear you. 💔 Please consider reaching out to a professional who can support you right now: 📞 9152987821. You matter so much." },
          { type: "bot", text: "Try to name 3 things you can see right now. I'm right here with you. 🌱" }
        ]);
      } else {
        const randomResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
        setMessages(prev => [...prev, { type: "bot", text: randomResponse }]);
      }
    }, 1500);
  };

  return (
    <div className="relative z-[100]">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-500 z-[101] ${
          isOpen ? 'bg-[#093832] rotate-90' : 'bg-[#F92F60]'
        }`}
      >
        {isOpen ? <XMarkIcon className="h-7 w-7 text-white" /> : <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7 text-white" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[90vw] h-[500px] max-h-[70vh] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-[#F1A6B4]/30 z-[100]"
          >
            {/* Header */}
            <div className="p-6 bg-[#093832] text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F1A6B4] rounded-full flex items-center justify-center text-xl">✨</div>
              <div>
                <h2 className="font-bold text-sm">Sahayak Companion</h2>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Online</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFE4D7]/10 custom-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                    msg.type === "user" 
                      ? "bg-[#093832] text-white rounded-tr-none" 
                      : "bg-[#F1A6B4] text-[#093832] rounded-tl-none font-medium"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-2xl bg-gray-100 text-[#093832] text-xs font-bold animate-pulse">
                    Sahayak is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Talk to me..."
                className="flex-1 p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 ring-[#F1A6B4] transition-all"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-[#F1A6B4] text-[#093832] rounded-xl hover:bg-pink-400 transition-all shadow-md"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
