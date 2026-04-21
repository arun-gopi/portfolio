import { useEffect, useRef, useState } from "react";
import { MessageSquareText, SendHorizonal, Sparkles, X } from "lucide-react";

const starterPrompts = [
  "What are Arun's core strengths?",
  "Summarize his healthcare RCM experience.",
  "Which analytics tools does he use?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");
  const [mounted, setMounted] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!messagesRef.current) return;

    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [history, botTypingText, open]);

  const send = async (message = query) => {
    if (!message.trim() || isBotTyping) return;
    const userMsg = message.trim();
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
      <path
        d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
        className="border-gray-200"
      ></path>
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

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-[0_18px_45px_rgba(15,23,42,0.28)] transition hover:bg-teal-700 disabled:pointer-events-none disabled:opacity-50 sm:bottom-6 sm:right-6 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-state={open ? "open" : "closed"}
        aria-label="Open chat"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 dark:bg-slate-950/10">
          <BotIconSVG />
        </span>
        <span className="hidden pr-1 text-left sm:block">
          <span className="block text-xs uppercase tracking-[0.2em] text-white/60 dark:text-slate-500">
            Ask AI
          </span>
          <span className="block text-sm font-semibold">Resume Assistant</span>
        </span>
      </button>

      {open && (
        <div
          style={{
            boxShadow: "0 24px 80px rgba(15, 23, 42, 0.22)",
          }}
          className="fixed bottom-20 right-4 z-40 flex max-h-[min(76vh,44rem)] w-[calc(100vw-2rem)] max-w-[25rem] flex-col rounded-[1.9rem] border border-white/10 bg-[rgba(255,255,255,0.96)] p-4 backdrop-blur-xl dark:bg-[rgba(15,23,42,0.98)] sm:bottom-24 sm:right-6 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-heading"
        >
          {/* Header */}
          <div className="pb-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/12 text-teal-700 dark:text-teal-300">
                  <MessageSquareText size={20} />
                </span>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/15 bg-teal-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-200">
                    <Sparkles size={12} />
                    Resume assistant
                  </div>
                  <h2
                    id="chat-heading"
                    className="mt-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white"
                  >
                    Ask about Arun Gopi
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
              Ask about experience, certifications, tools, healthcare RCM background, or analytics work.
            </p>
          </div>

          {/* Chat Container with scrollbar */}
          <div
            ref={messagesRef}
            className="scrollbar-hidden flex-1 overflow-y-auto pr-1"
            style={{ minWidth: "100%" }}
          >
            {history.length === 0 && !isBotTyping && (
              <div className="mb-5 rounded-[1.5rem] border border-white/10 bg-white/70 p-4 dark:bg-slate-900/60">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Quick starters
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => send(prompt)}
                      className="rounded-full border border-white/10 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-teal-500/30 hover:text-teal-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-teal-300"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {[...history].map((msg, idx) => {
              const isUser = msg.sender === "user";

              return (
                <div
                  key={idx}
                  className={`my-4 flex max-w-[88%] text-sm ${
                    isUser ? "justify-end ml-auto" : "justify-start mr-auto"
                  }`}
                >
                  <div
                    className={`flex items-end gap-3 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                    style={{ flex: 1 }}
                  >
                    {/* Icon */}
                    <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                      <div className="rounded-full border border-white/10 bg-slate-100 p-1 dark:bg-slate-800">
                        {isUser ? <UserIcon /> : <AIIcon />}
                      </div>
                    </span>

                    {/* Message bubble */}
                    <p
                      className={`
            max-w-[250px] px-4 py-3 leading-relaxed whitespace-pre-wrap shadow-sm sm:max-w-[290px]
            ${
              isUser
                ? "rounded-2xl rounded-br-md bg-teal-600 text-white dark:bg-teal-500 dark:text-slate-950"
                : "rounded-2xl rounded-bl-md bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
            }
          `}
                    >
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            })}

            {isBotTyping && (
              <div className="my-4 flex flex-1 gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                  <div className="rounded-full border border-white/10 bg-slate-100 p-1 dark:bg-slate-800">
                    <AIIcon />
                  </div>
                </span>
                <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 font-bold leading-relaxed text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                  Assistant{" "}
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    {botTypingText}
                    <span className="animate-bounce">|</span>
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Input box */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex w-full items-center justify-center gap-2"
            >
              <input
                type="text"
                className="flex h-11 w-full rounded-full border border-white/10 bg-white/80 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-500"
                placeholder="Ask about experience, tools, or achievements"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isBotTyping}
                aria-label="Type a message"
              />
              <button
                type="submit"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-teal-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300"
                disabled={isBotTyping}
                aria-label="Send message"
              >
                <SendHorizonal size={16} />
              </button>
            </form>
            <p className="mt-3 text-xs leading-5 text-slate-400 dark:text-slate-500">
              The assistant answers only from resume-related information.
            </p>
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
