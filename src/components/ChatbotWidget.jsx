import React, { useState, useEffect, useRef } from 'react';
import { ChatBubbleOvalLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

const supportiveResponses = [
  "I'm here for you. Remember, tough times don't last, but tough people do. 🌈",
  "Take a deep breath. You're doing the best you can, and that's enough. 🧘‍♀️",
  "Would you like a journaling prompt? ✍️ 'What are three things that made you smile today?'",
  "Feeling overwhelmed? Try the 4-7-8 breathing technique. Inhale 4 sec, hold 7 sec, exhale 8 sec. 🌬️",
  "You're not alone. It's okay to ask for help. ❤️",
];

const distressKeywords = ["panic", "anxiety", "suicidal", "depressed", "help", "distress", "hopeless"];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi there! 🌟 I'm your companion. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); // Start typing...

    const lowerInput = input.toLowerCase();
    const distressDetected = distressKeywords.some(keyword => lowerInput.includes(keyword));

    setTimeout(() => {
      setIsTyping(false); // Stop typing
      if (distressDetected) {
        setMessages(prev => [
          ...prev,
          { type: "bot", text: "It sounds like you're going through a tough time. 💔 Please consider reaching out to a helpline: 📞 9152987821 (India Helpline). You matter." },
          { type: "bot", text: "Here's a calming exercise: Breathe in... Breathe out... You are safe. 🌱" }
        ]);
      } else {
        const randomResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
        setMessages(prev => [...prev, { type: "bot", text: randomResponse }]);
      }
    }, 2000); // Typing delay: 2 seconds
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#F92F60] text-white p-4 rounded-full shadow-lg hover:bg-red-400 transition-all z-50"
        >
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[450px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden z-50">
          <div className="flex items-center justify-between p-4 bg-[#F1A6B4] text-black">
            <h2 className="text-lg font-semibold">Sahayak Chat</h2>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-xl max-w-[75%] ${msg.type === "user" ? "bg-[#F92F60] text-black" : "bg-[#F1A6B4] text-black"}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Animation */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-xl bg-[#F1A6B4] text-vlack max-w-[75%]">
                  <span className="animate-pulse">Bot is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F1A6B4]"
            />
            <button
              onClick={handleSend}
              className="bg-[#F1A6B4] text-black px-4 py-2 rounded-full hover:bg-pink-500 transition-all text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
