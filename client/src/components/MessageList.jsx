import { useEffect, useRef } from "react";

export default function MessageList({ chatLog, myUserId }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
      {chatLog.map((msg, index) => {
        const isMe = msg.socketId === myUserId;
        const time = msg.createdAt 
          ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : "";

        return (
          <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[75%] shadow-md ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-slate-400 mb-1 block px-2">
                {isMe ? "Ty" : msg.userName || "Host"}
              </span>
              <div className={`p-3 rounded-2xl ${
                isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-700 text-slate-100 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <span className="text-[9px] opacity-60 block mt-1 text-right">{time}</span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}