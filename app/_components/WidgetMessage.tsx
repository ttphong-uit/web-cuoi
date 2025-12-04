"use client";
import React, { useState, useEffect, useRef } from "react";
import { Message } from "@/app/_types/message";

type WidgetMessageProps = {
  shouldShow?: boolean;
};

export const WidgetMessage: React.FC<WidgetMessageProps> = ({
  shouldShow = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Fetch messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://62a6ec0ebedc4ca6d7bd21af.mockapi.io/api/message"
      );
      const data = await response.json();
      setMessages(data || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://62a6ec0ebedc4ca6d7bd21af.mockapi.io/api/message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            content: content.trim(),
            createdAt: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
          }),
        }
      );

      if (response.ok) {
        setName("");
        setContent("");
        setIsModalOpen(false);
        await fetchMessages();
      }
    } catch (error) {
      console.error("Failed to submit message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hide widget when Cover is shown
  if (!shouldShow) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-50 bg-linear-to-r from-rose-400 to-pink-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:shadow-xl hover:from-rose-500 hover:to-pink-600 transition-all duration-300 font-quickSand font-semibold text-sm md:text-base cursor-pointer"
        aria-label="Open messages"
      >
        💌 Gửi lời chúc ({messages.length})
      </button>
    );
  }

  return (
    <>
      {/* Widget Container */}
      <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-50 w-[85vw] max-w-[320px] md:max-w-[360px] bg-linear-to-br from-rose-50 to-pink-100 rounded-2xl shadow-2xl overflow-hidden border-2 border-rose-200">
        {/* Header */}
        <div className="bg-linear-to-r from-rose-400 to-pink-500 text-white p-3 md:p-4 flex justify-between items-center">
          <h3 className="font-dancingScript text-xl md:text-2xl">Lời chúc</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            aria-label="Close messages"
          >
            ✕
          </button>
        </div>

        {/* Message List */}
        <div
          ref={messageListRef}
          className="h-[180px] md:h-[220px] overflow-hidden relative bg-white/50 p-3 md:p-4"
        >
          <div className="animate-scroll-up space-y-2 md:space-y-3">
            {[...messages, ...messages].map((message, index) => (
              <div
                key={`${message.id}-${index}`}
                className="bg-white/90 backdrop-blur-sm rounded-lg p-2 md:p-3 shadow-sm border border-rose-200 animate-fade-in"
              >
                <p className="font-quickSand text-xs md:text-sm text-gray-800">
                  <span className="font-semibold text-rose-600">
                    {message.name}:
                  </span>{" "}
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="p-3 md:p-4 bg-white border-t border-rose-200">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-linear-to-r from-rose-400 to-pink-500 text-white py-2 md:py-3 rounded-lg font-quickSand font-semibold hover:from-rose-500 hover:to-pink-600 hover:shadow-lg transition-all duration-300 text-sm md:text-base cursor-pointer"
          >
            Gửi lời chúc
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-60 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full md:max-w-[576px] md:rounded-2xl rounded-t-2xl p-6 shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-dancingScript text-3xl text-rose-600">
                Gửi lời chúc
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-quickSand font-semibold text-gray-700 mb-2"
                >
                  Tên của bạn <span className="text-rose-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:outline-none font-quickSand transition-colors"
                  placeholder="Nhập tên của bạn"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block font-quickSand font-semibold text-gray-700 mb-2"
                >
                  Lời chúc <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:outline-none font-quickSand transition-colors resize-none"
                  placeholder="Gửi lời chúc"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-rose-400 to-pink-500 text-white py-3 rounded-lg font-quickSand font-semibold hover:from-rose-500 hover:to-pink-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
