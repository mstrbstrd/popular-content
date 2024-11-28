"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatBubbleProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Sending request to API");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      console.log("Received response:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      let errorMessage = "Sorry, I encountered an error. Please try again.";

      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
      // Re-focus input after sending message
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border">
          {/* Chat Header */}
          <div className="p-4 bg-black text-white flex justify-between items-center">
            <h3 className="font-semibold">Chat with Popular Content</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px] bg-gray-50"
            role="log"
            aria-live="polite"
          >
            {messages.length === 0 ? (
              <div className="text-gray-600 text-center mt-8">
                Start a conversation! Ask me anything about content creation,
                writing, or digital marketing.
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-black text-white rounded-br-none"
                        : "bg-white border text-gray-900 rounded-bl-none"
                    }`}
                    role={message.role === "assistant" ? "status" : "none"}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border text-gray-900 p-3 rounded-lg rounded-bl-none">
                  <div
                    className="flex space-x-2"
                    role="status"
                    aria-label="Loading response"
                  >
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder:text-gray-500 bg-white"
                aria-label="Message input"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 hover:scale-110"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ChatBubbleProvider />
    </>
  );
}
