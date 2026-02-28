"use client";

import { useState } from "react";

export default function RoomPage({ params }: { params: { language: string } }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([
    { sender: "ai", text: "AI Assistant is ready to collaborate." },
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: message,
          action: "assist",
        }),
      });

      const data = await res.json();

      const aiMessage = {
        sender: "ai",
        text: data.result || "AI failed to respond.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error connecting to AI." },
      ]);
    }
  };

  const handleQuickAction = async (action: string) => {
    if (!message.trim()) return;

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: message,
        action,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: data.result },
    ]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-black/30 p-6">
        <h2 className="text-xl font-bold mb-4">Members</h2>
        <p>🟢 Govind</p>
        <p>🟢 Developer</p>
        <p className="text-purple-400 mt-2">🤖 AI Assistant</p>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">
            CodePulse Collaboration Room - {params.language}
          </h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xl p-4 rounded-xl ${
                msg.sender === "user"
                  ? "bg-blue-600 self-end ml-auto"
                  : "bg-white/10"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Quick AI Buttons */}
        <div className="flex gap-3 px-6 pb-2">
          <button
            onClick={() => handleQuickAction("debug")}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Debug
          </button>
          <button
            onClick={() => handleQuickAction("explain")}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500"
          >
            Explain
          </button>
          <button
            onClick={() => handleQuickAction("optimize")}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500"
          >
            Optimize
          </button>
        </div>

        {/* Input */}
        <div className="p-6 flex gap-4 border-t border-white/10">
          <input
            type="text"
            placeholder="Write your message..."
            className="flex-1 p-3 rounded-xl bg-black/40 border border-purple-500 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-500"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}