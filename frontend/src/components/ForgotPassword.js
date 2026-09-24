import React, { useState } from "react";
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = (e) => {
        e.preventDefault();

        // Simulate sending the reset link
        setTimeout(() => {
            setMessage(`We've sent a password reset link to ${email}. If you don't see it, check your spam folder.`);
        }, 1000);
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Forgot Password</h2>
                <p>We'll send you a link to reset your password</p>

                {message ? (
                    <div className="reset-message">
                        <p>✅ {message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleReset}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Send Reset Link</button>
                    </form>
                )}

                <a href="/login">Back to Login</a>
            </div>
        </div>
    );
};

export default ForgotPassword;
