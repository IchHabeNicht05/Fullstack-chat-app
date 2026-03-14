import { useState, useEffect } from "react";

export default function MessageInput({ onSendMessage, socket, username }) {
  const [message, setMessage] = useState("");

  // Když uživatel změní text, pošleme serveru "píšu"
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { userName: username, isTyping: true });
  };

  // Debounce efekt: Pokud uživatel 1.5 sekundy nic nenapíše, pošleme "už nepíšu"
  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("typing", { userName: username, isTyping: false });
    }, 1500);

    return () => clearTimeout(timer);
  }, [message, socket, username]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      // Okamžitě zrušíme indikátor psaní po odeslání
      socket.emit("typing", { userName: username, isTyping: false });
    }
  };

  return (
    <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
      <input
        className="flex-1 bg-slate-900 border border-slate-600 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
        value={message}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Napiš zprávu..."
      />
      <button 
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-500 p-3 rounded-2xl transition-all active:scale-90 shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white rotate-90">
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
        </svg>
      </button>
    </div>
  );
}