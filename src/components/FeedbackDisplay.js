import React from "react";

function FeedbackDisplay({ feedback }) {
  return (
    <div className="feedback">
      <h3>Feedback:</h3>
      <p>{feedback}</p>
    </div>
  );
}

export default FeedbackDisplay;
