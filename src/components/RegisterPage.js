import React, { useState } from "react";
import "../styles/RegisterPage.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="overlay">
          <button className="back-button">Back to website →</button>
          <h1>
            Capturing Moments, <br /> Creating Memories
          </h1>
          <div className="carousel-indicators">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot active"></span>
          </div>
        </div>
      </div>
      <div className="register-right">
        <div className="register-box">
          <h2>Create an account</h2>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
          <div className="input-group">
            <input type="text" placeholder="First Name" className="custom-input" />
            <input type="text" placeholder="Last Name" className="custom-input" />
          </div>
          <input type="email" placeholder="Email" className="custom-input" />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="custom-input"
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? "👁" : "👁‍🗨"}
            </span>
          </div>
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <a href="/terms">Terms & Conditions</a>
            </label>
          </div>
          <button className="register-button">Create account</button>
          <div className="divider">Or register with</div>
          <div className="social-buttons">
            <button className="google">Google</button>
            <button className="apple">Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;