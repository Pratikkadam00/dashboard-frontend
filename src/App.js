import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input.trim() };
    setConversation([...conversation, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        prompt: input.trim(),
      });
      const botMessage = { sender: "bot", text: response.data.message };
      setConversation([...conversation, userMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div className="App">
      <h1>Chat with GPT-3.5</h1>
      <div className="conversation">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={input.trim() === ""}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
