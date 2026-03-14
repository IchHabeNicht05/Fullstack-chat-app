import { useState, useEffect } from "react";
import io from "socket.io-client";
import WelcomeScreen from "./components/WelcomeScreen";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

const socket = io.connect("http://localhost:3001");

const getUserId = () => {
  let id = localStorage.getItem("chat_user_id");
  if (!id) {
    id = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("chat_user_id", id);
  }
  return id;
};

const myUserId = getUserId();

function App() {
  const [username, setUsername] = useState(localStorage.getItem("chat_username") || "");
  const [chatLog, setChatLog] = useState([]);
  const [typingStatus, setTypingStatus] = useState(null);

  useEffect(() => {
    socket.on("load_messages", (messages) => setChatLog(messages));
    socket.on("receive_message", (data) => setChatLog(prev => [...prev, data]));
    
    // Poslech pro indikátor psaní
    socket.on("user_typing", (data) => {
      if (data.isTyping) {
        setTypingStatus(`${data.userName} píše...`);
      } else {
        setTypingStatus(null);
      }
    });

    return () => {
      socket.off("load_messages");
      socket.off("receive_message");
      socket.off("user_typing");
    };
  }, []);

  const handleJoin = (name) => {
    setUsername(name);
    localStorage.setItem("chat_username", name);
  };

  const handleSendMessage = (text) => {
    const msgData = { text, userId: myUserId, userName: username };
    socket.emit("send_message", msgData);
  };

  if (!username) return <WelcomeScreen onJoin={handleJoin} />;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg flex flex-col h-[85vh] bg-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-slate-700/50">
        
        <div className="p-6 bg-slate-800/80 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-white">Chat Room</h1>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
            </p>
          </div>
          <button 
            onClick={() => {localStorage.removeItem("chat_username"); window.location.reload();}}
            className="text-xs text-slate-400 hover:text-white underline transition-colors"
          >
            Změnit jméno
          </button>
        </div>

        <MessageList chatLog={chatLog} myUserId={myUserId} />

        {/* Zobrazení indikátoru psaní */}
        <div className="h-6 px-6">
          {typingStatus && (
            <p className="text-xs text-blue-400 italic animate-pulse">{typingStatus}</p>
          )}
        </div>

        <MessageInput 
          onSendMessage={handleSendMessage} 
          socket={socket} 
          username={username} 
        />
      </div>
    </div>
  );
}

export default App;