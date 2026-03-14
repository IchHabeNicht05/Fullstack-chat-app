import { useState } from "react";

export default function WelcomeScreen({ onJoin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onJoin(name);
  };

  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6">Vítej v chatu! 👋</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Jak ti máme říkat?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all transform active:scale-95">
            Vstoupit do chatu
          </button>
        </form>
      </div>
    </div>
  );
}