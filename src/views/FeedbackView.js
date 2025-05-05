// src/views/FeedbackView.js
import React from "react";
import "../styles/feedback-display.css";

const FeedbackView = ({ feedback, tags }) => {
  return (
    <div className="feedback-container">
      <h3>📝 Interview Coach Feedback</h3>
      <p className="feedback-text">{feedback}</p>

      {tags.length > 0 && (
        <div className="tag-container">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`feedback-tag ${tag.color.toLowerCase()}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackView;
