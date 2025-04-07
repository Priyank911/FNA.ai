import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes, faRocket, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! ✨ How can I make your day magical?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const chatBodyRef = useRef(null);
  const toggleBtnRef = useRef(null);

  // Enhanced 3D animation effect for toggle button
  const handleMouseMove = (e) => {
    if (!toggleBtnRef.current) return;
    
    const btn = toggleBtnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 10;
    const angleY = (centerX - x) / 10;
    
    btn.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
    btn.style.filter = `brightness(${1 + Math.abs(angleX + angleY) / 100})`;
  };

  const handleMouseLeave = () => {
    if (toggleBtnRef.current) {
      toggleBtnRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      toggleBtnRef.current.style.filter = 'brightness(1)';
    }
  };

  // Allow dragging the chat window
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.chat-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMoveWindow = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 320, newX)),
        y: Math.max(0, Math.min(window.innerHeight - 450, newY))
      });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveWindow);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWindow);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { from: "user", text: input };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      try {
        const responseNormal = await axios.post(`https://api-inference.huggingface.co/models/openai-community/gpt2`, {
          inputs: input,
        }, {
          headers: {
            Authorization: ``,
            'Content-Type': 'application/json'
          },
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        const botReply = {
          from: "bot",
          text: responseNormal.data?.[0]?.generated_text || "I apologize, I couldn't generate a response."
        };

        setMessages(prev => [...prev, botReply]);
      } catch (error) {
        console.error("Error fetching response:", error);
        const botReply = {
          from: "bot",
          text: "I apologize, I'm having trouble connecting to the server."
        };
        setMessages(prev => [...prev, botReply]);
      }

      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div 
          className="chat-box"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="chat-header">
            <div className="header-content">
              <div className="logo-animation">
                <div className="logo-sphere">
                  <div className="sphere-content">
                    <FontAwesomeIcon icon={faMagicWandSparkles} />
                  </div>
                  <div className="stars"></div>
                </div>
              </div>
              <h2>AI Assistant</h2>
            </div>
            <button className="close-btn" onClick={toggleChat}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`chat-message ${message.from}`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <span>{message.text}</span>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot typing">
                <span>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </span>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button className="send-btn" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faRocket} />
            </button>
          </div>
        </div>
      )}
      <button 
        ref={toggleBtnRef}
        className="chat-toggle-btn"
        onClick={toggleChat}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="toggle-animation">
          <div className="sphere-outer"></div>
          <div className="sphere-inner">
            <div className="sphere-content">
              <FontAwesomeIcon icon={faMagicWandSparkles} />
            </div>
            <div className="stars"></div>
            <div className="swirl"></div>
            <div className="swirl"></div>
            <div className="swirl"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ChatWidget;
