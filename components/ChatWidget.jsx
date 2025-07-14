import { useState } from "react";
import { BotIcon } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");


  const send = async () => {
    if (!query.trim() || isBotTyping) return;

    const userMsg = query;
    setQuery("");
    setHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setIsBotTyping(true);
    setBotTypingText("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await res.json();
    const answer = data.answer || "";

    // Typing animation for bot
    let displayed = "";
    for (let i = 0; i < answer.length; i++) {
      displayed += answer[i];
      setBotTypingText(displayed);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 15));
    }
    setHistory((prev) => [...prev, { sender: "bot", text: answer }]);
    setIsBotTyping(false);
    setBotTypingText("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-1 rounded-full shadow-xl hover:bg-blue-700 transition flex items-center gap-2"
      >
        <BotIcon size={24} />
        Chat
      </button>

      {/* Chat Popup */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 animate-slide-up-fade bg-white w-80 max-h-[75vh] rounded-lg shadow-xl border flex flex-col font-Ovo"
          style={{ animation: "slideUpFade 0.3s ease-out" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
            <h2 className="text-sm font-semibold font-Ovo">Résumé Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {history.map((m, i) => (
              <div
                key={i}
                className={`max-w-xs px-3 py-2 rounded-md font-Ovo ${
                  m.sender === "user"
                    ? "ml-auto bg-blue-100 text-right "
                    : "mr-auto bg-gray-100 text-left"
                }`}
              >
                {m.text}
              </div>
            ))}
            {isBotTyping && (
              <div className="max-w-xs px-3 py-2 rounded-md font-Ovo mr-auto bg-gray-100 text-left flex items-center gap-1">
                {botTypingText}
                <span className="animate-bounce">|</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 border rounded px-3 py-1.5 text-sm font-Ovo"
              placeholder="Ask about the résumé…"
              disabled={isBotTyping}
            />
            <button
              onClick={send}
              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm font-Ovo"
              disabled={isBotTyping}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUpFade {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up-fade {
          animation: slideUpFade 0.3s ease-out;
        }
        .animate-bounce {
          display: inline-block;
          animation: bounce 1s infinite alternate;
        }
        @keyframes bounce {
          to {
            transform: translateY(-4px);
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
}
