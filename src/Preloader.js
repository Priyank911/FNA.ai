import React, { useEffect, useState, useRef } from 'react';
import './Preloader.css';

function Preloader() {
  const [progress, setProgress] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);
  const [statusText, setStatusText] = useState("SYSTEM INITIALIZING");
  const [hidePreloader, setHidePreloader] = useState(false);
  const containerRef = useRef(null);
  const particlesRef = useRef(null);
  const circuitRef = useRef(null);

  useEffect(() => {
    // Create random horizontal and vertical circuit lines
    if (circuitRef.current) {
      // Create horizontal lines
      for (let i = 0; i < 8; i++) {
        const hLine = document.createElement('div');
        hLine.className = 'h-line';
        hLine.style.top = `${Math.random() * 100}%`;
        hLine.style.left = `${Math.random() * 80}%`;
        hLine.style.width = `${Math.random() * 15 + 5}%`;
        hLine.style.animationDelay = `${Math.random() * 10}s`;
        circuitRef.current.appendChild(hLine);
      }
      
      // Create vertical lines
      for (let i = 0; i < 8; i++) {
        const vLine = document.createElement('div');
        vLine.className = 'v-line';
        vLine.style.left = `${Math.random() * 100}%`;
        vLine.style.top = `${Math.random() * 80}%`;
        vLine.style.height = `${Math.random() * 15 + 5}%`;
        vLine.style.animationDelay = `${Math.random() * 10}s`;
        circuitRef.current.appendChild(vLine);
      }
    }
    
    // Create floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 30; i++) {
        createParticle();
      }
    }
    
    // Create particle function
    function createParticle() {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = Math.random() > 0.5 ? 'rgba(54, 249, 246, 0.4)' : 'rgba(138, 43, 226, 0.4)';
      particle.style.borderRadius = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      
      // Animation
      const duration = Math.random() * 30 + 15;
      particle.style.animation = `float ${duration}s linear infinite`;
      particle.style.animationDelay = `-${Math.random() * duration}s`;
      
      // Add keyframe animation dynamically
      const style = document.createElement('style');
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;
      
      style.textContent = `
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(${randomX}px, ${randomY}px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `;
      
      document.head.appendChild(style);
      particlesRef.current.appendChild(particle);
    }

    // Subtle line animation
    const lineInterval = setInterval(() => {
      if (containerRef.current) {
        const line = document.createElement('div');
        line.className = 'scan-line';
        line.style.top = `${Math.random() * 100}%`;
        containerRef.current.appendChild(line);
        
        // Remove line after animation completes
        setTimeout(() => {
          if (line && line.parentNode) {
            line.parentNode.removeChild(line);
          }
        }, 2000);
      }
    }, 800);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + (Math.random() * 1.5 + 0.5);
        
        // Update status text based on progress
        if (newProgress > 25 && newProgress <= 50) {
          setStatusText("INITIALIZING NEURAL INTERFACE");
        } else if (newProgress > 50 && newProgress <= 75) {
          setStatusText("ESTABLISHING SECURE CONNECTION");
        } else if (newProgress > 75 && newProgress < 100) {
          setStatusText("PREPARING FNA ENVIRONMENT");
        } else if (newProgress >= 100) {
          setStatusText("SYSTEM READY");
          clearInterval(progressInterval);
          clearInterval(lineInterval);
          
          // Hide preloader after animation completes
          setTimeout(() => {
            setHidePreloader(true);
            
            // Remove preloader from DOM after transition
            setTimeout(() => {
              setShowPreloader(false);
            }, 800);
          }, 1000);
          
          return 100;
        }
        return Math.min(newProgress, 100);
      });
    }, 60);

    // Cleanup function
    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // Content to show after preloader
  const mainContent = (
    <div className="content">
      <h1>Welcome to FNA.ai</h1>
      <p>Your content goes here...</p>
    </div>
  );

  return (
    <div className="App">
      {showPreloader && (
        <div ref={containerRef} className={`preloader ${hidePreloader ? 'hide' : ''}`}>
          <div className="grid-lines"></div>
          <div ref={particlesRef} className="particles"></div>
          <div ref={circuitRef} className="circuit-lines"></div>
          <div className="gradient-overlay"></div>
          
          <div className="logo-container">
            <div className="logo-text">
              <span className="logo-prefix">FNA</span>
              <span className="dot">.</span>
              <span className="logo-suffix">ai</span>
            </div>
            
            <div className="tech-interface">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bottom-left"></div>
              <div className="corner bottom-right"></div>
              
              <div className="status-container">
                <div className="status-wrapper">
                  <div className="status-icon"></div>
                  <div className="status-text">{statusText}</div>
                </div>
                <div className="progress-value">{Math.floor(progress)}%</div>
              </div>
              
              <div className="progress-bar-container">
                <div className="progress-track">
                  <div className="progress-bar" style={{ width: `${progress}%` }}>
                    <div className="progress-glow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!showPreloader && mainContent}
    </div>
  );
}

export default Preloader;