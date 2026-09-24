import React, { useState } from 'react';
import './styles/feedback.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the form data to your API here
    alert('Feedback submitted!');
  };

  return (
    <div className="feedback-container">
      <h1>Share Your Feedback</h1>
      <p className="subtext">We value your input and are committed to improving our services.</p>

      <form className="feedback-card" onSubmit={handleSubmit}>
        <h2>Rate Your Experience</h2>
        <p className="rating-subtext">How would you rate your overall experience with our design services?</p>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hovered || rating) ? 'filled' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Tell us about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <label className="file-label">
          Add Photos or Documents (Optional)
          <input type="file" onChange={handleFileChange} />
        </label>

        <button type="submit">Submit Feedback</button>
      </form>

      <div className="specific-feedback">
        <h3>Specific Feedback Areas</h3>
        <p>We'd love to hear about specific aspects of our service</p>
        {/* You can add checkboxes or input here if needed */}
      </div>
    </div>
  );
};

export default Feedback;
