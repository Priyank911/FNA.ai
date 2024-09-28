import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';
import './ChatWidget.css'; //

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋, how can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { from: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {

        const responseNormal = await axios.post(`https://api-inference.huggingface.co/models/openai-community/gpt2`, {
          inputs: input,
        }, {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json'
          },
        });

        const botReplyNormal = { from: "bot", text: responseNormal.data?.[0]?.generated_text || "Sorry, I couldn't generate a normal response." };
        //const botReplyNews = { from: "bot", text: responseNews.data?.[0]?.generated_text || "Sorry, I couldn't fetch news-related info." };

        setMessages((prevMessages) => [...prevMessages, botReplyNormal]);

      } catch (error) {
        console.error("Error fetching response:", error);
        const botReply = { from: "bot", text: "Sorry, I couldn't get a response from the server." };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }

      setInput("");
    }
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h2>Chatbot</h2>
            <button className="close-btn" onClick={toggleChat}>✖</button>
          </div>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.from}`}>
                <span>{message.text}</span>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a Message"
              style={{ backgroundColor: "white", color: "black", fontWeight: "lighter" }}
            />
            <button onClick={handleSendMessage} className="send-btn">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
      <button className="chat-toggle-btn" onClick={toggleChat}>
        <FontAwesomeIcon icon={faRobot} className="chat-toggle-icon" />
      </button>
    </div>
  );
};

export default ChatWidget;
