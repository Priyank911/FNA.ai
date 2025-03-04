import React, { useState } from "react";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with:", email, password);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Logging in with Google");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <p>If You Are Already A Member, Easily Log In</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? "👁" : "👁‍🗨"}
          </span>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <div className="or-divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <button className="google-login-button" onClick={handleGoogleLogin}>
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google"
          />
          Login with Google
        </button>

        <a href="/forgot-password" className="forgot-password">
          Forgot my password
        </a>

        <div className="register-prompt">
          <p>If You Don't Have An Account, Create</p>
          <a href="/register">Register</a>
        </div>
      </div>

      <div className="login-image">
        <img
          src="./avatar/Priyank.jpg" // Replace with your image URL
          alt="Gaming Setup"
        />
      </div>
    </div>
  );
};

export default LoginPage;