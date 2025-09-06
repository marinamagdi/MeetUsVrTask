"use client";
import React, { useState, useEffect } from "react";
import"../../styles/login.css";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import BackGroundGradient from "./BackGroundGradient";


const Form = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) return "Invalid email format";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError("");
    } else {
      setEmailError(validateEmail(value));
    }
    setError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError("");
    } else {
      setPasswordError(validatePassword(value));
    }
    setError("");
  };

  const isFormValid = !validateEmail(email) && !validatePassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      dispatch(
        setUser({
          token: null,
          email,
          id: data.id,
          name: data.name,
        })
      );
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>


      <BackGroundGradient />

      {/* Left Card */}
     <div className="FormContainer">
        <div className="login-box">

          <div className="titlebox">
            <h2 className="title">Welcome back</h2>
            <p className="subtitle-text">Step into our shopping metaverse for
              an unforgettable shopping experience</p>
          </div>

          <div  className={`inputs-frame ${emailError ? "with-error" : ""}`}>
            <form onSubmit={handleSubmit} >

              <div>
                <div className={`input-Email ${emailError ? "with-error" : ""}`}>
                  
                  <img src="/images/sms.png" alt="email" className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {emailError && <p className="error-text">{emailError}</p>}
              </div>

              <div>
                <div className={`input-Password ${emailError ? "with-error" : ""}`}>
                  <img src="/images/lock.png" alt="email" className="input-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {passwordError && <p className="error-text">{passwordError}</p>}
              </div>
            </form>
          </div>
          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className="login-btn"
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
            style={{ opacity: isFormValid && !loading ? 1 : 0.5 }}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <span>Login</span>
            )}
          </button>

          <p className="signup-text">
            Don’t have an account? <span>Sign up</span>
          </p>
        </div>
      </div >
      {/* Second Card */}
       <div div className="Image-card" >
        <div className="Image-container">
          <div className="images">
            <div className="meetusvr"> <img src="/images/MeetUsVr.png" alt="" /></div>
            <div className="meetusvr2"><img src="/images/MeetUsVr2.png" alt="" /> </div>
          </div>
          <img src="/images/MeetUsLogo.png" alt="" className="imagelogo" />
        </div>
      </div >  
    </>

  );
};

export default Form;