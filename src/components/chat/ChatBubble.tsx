"use client";

import { useState } from "react";

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      >
        Chat
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl p-4">
          <h3>Chat with Popular Content</h3>
          <p>This is a test message to check visibility.</p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 bg-black text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
