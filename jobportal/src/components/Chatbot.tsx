"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { MessageSquare, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

// Helper to extract plain text from a UIMessage (text parts only)
function getMessageText(message: UIMessage) {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [quickUsed, setQuickUsed] = useState(false);
  const router = useRouter();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, setMessages } = useChat({
    onFinish: ({ message }) => {
      // Clear previous error on successful response
      setErrorMsg(null);
      const content = getMessageText(message);
      const navigateMatch = content.match(/\[NAVIGATE:([^\]]+)\]/);
      if (navigateMatch && navigateMatch[1]) {
        router.push(navigateMatch[1]);
      }
    },
    onError: (err) => {
      console.error("Chat error:", err);
      setErrorMsg(
        "Assistant is temporarily unavailable. Please try again later."
      );
    },
  });

  // Auto-scroll on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Show welcome message when opening chat the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome-message",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Hello! I’m your Job Assistant. How can I support you today?",
            },
          ],
        },
      ]);
      setQuickUsed(false);
    }
  }, [isOpen, messages.length, setMessages]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    sendMessage({ text: trimmed });
    setQuickUsed(true);
  };

  const showQuickActions =
    !quickUsed && messages.length > 0 && messages[0].id === "welcome-message";

  return (
    <div>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-transform transform hover:scale-110 z-50 animate-pulse hover:animate-none"
        aria-label="Toggle chatbot"
      >
        <div className="relative h-6 w-6">
          <MessageSquare
            className={`absolute transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-0 transform rotate-90 scale-50"
                : "opacity-100 transform rotate-0 scale-100"
            }`}
            size={24}
          />
          <X
            className={`absolute transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 transform rotate-0 scale-100"
                : "opacity-0 transform -rotate-90 scale-50"
            }`}
            size={24}
          />
        </div>
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-5 w-full max-w-md h-[60vh] rounded-lg shadow-xl flex flex-col z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        } bg-white dark:bg-gray-800`}
      >
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">
            Job Assistant
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by OpenAI
          </p>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-4 space-y-4 overflow-y-auto"
        >
          {messages
            .filter((m) => !getMessageText(m).includes("[NAVIGATE:"))
            .map((m) => {
              const text = getMessageText(m);
              return (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      m.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                    }`}
                  >
                    {text}
                  </div>
                </div>
              );
            })}

          {showQuickActions && (
            <div className="mt-2 flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => {
                  setQuickUsed(true);
                  sendMessage({ text: "find jobs" });
                }}
                className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs hover:bg-blue-700"
              >
                Browse jobs
              </button>
              <button
                onClick={() => {
                  setQuickUsed(true);
                  sendMessage({ text: "find company" });
                }}
                className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs hover:bg-blue-700"
              >
                Browse companies
              </button>
              <button
                onClick={() => {
                  setQuickUsed(true);
                  sendMessage({ text: "show my applied jobs" });
                }}
                className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs hover:bg-blue-700"
              >
                My applications
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mt-2 text-xs text-red-500">{errorMsg}</div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t dark:border-gray-700 flex items-center"
        >
          <input
            className="flex-1 w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="Ask about jobs, applications, companies..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
