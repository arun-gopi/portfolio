import { useState } from "react";

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
    let displayed = "";
    for (let i = 0; i < answer.length; i++) {
      displayed += answer[i];
      setBotTypingText(displayed);
      await new Promise((resolve) => setTimeout(resolve, 15));
    }
    setHistory((prev) => [...prev, { sender: "bot", text: answer }]);
    setIsBotTyping(false);
    setBotTypingText("");
  };

  const BotIconSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white block border-gray-200 align-middle"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
    </svg>
  );

  const AIIcon = () => (
    <svg
      stroke="none"
      fill="black"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      ></path>
    </svg>
  );

  const UserIcon = () => (
    <svg
      stroke="none"
      fill="black"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
    </svg>
  );

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-state={open ? "open" : "closed"}
        aria-label="Open chat"
      >
        <BotIconSVG />
      </button>

      {open && (
        <div
          style={{ boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)" }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb]  w-[360px] max-h-[65vh] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-heading"
        >
          {/* Header */}
          <div className="flex flex-col space-y-1.5 pb-6">
            <div className="flex justify-between items-center">
              <h2 id="chat-heading" className="font-semibold text-lg tracking-tight">
                Resume Chatbot
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-gray-500 hover:text-gray-700 font-bold text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>
            <p className="text-sm text-[#6b7280] leading-3">Chat with my Resume!</p>
          </div>

          {/* Chat Container with scrollbar */}
          <div
            className="pr-4 flex-1 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            style={{ minWidth: "100%" }}
          >
            {[...history].map((msg, idx) => (
              <div
                key={idx}
                className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
                style={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}
              >
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    {msg.sender === "bot" ? <AIIcon /> : <UserIcon />}
                  </div>
                </span>
                <p className="leading-relaxed max-w-[80%] whitespace-pre-wrap text-gray-700 font-bold">
                  {msg.sender === "bot" ? "AI " : "You "}
                  <span className="font-normal text-gray-600">{msg.text}</span>
                </p>
              </div>
            ))}

            {isBotTyping && (
              <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    <AIIcon />
                  </div>
                </span>
                <p className="leading-relaxed max-w-[80%] whitespace-pre-wrap text-gray-700 font-bold">
                  AI <span className="font-normal text-gray-600">{botTypingText}<span className="animate-bounce">|</span></span>
                </p>
              </div>
            )}
          </div>

          {/* Input box */}
          <div className="flex items-center pt-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center justify-center w-full space-x-2"
            >
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your Questions here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isBotTyping}
                aria-label="Type a message"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                disabled={isBotTyping}
                aria-label="Send message"
              >
                Send
              </button>
            </form>
          </div>

          <style jsx>{`
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
        </div>
      )}
    </>
  );
}