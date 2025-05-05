import React from "react";

function HintsDisplay({ hints }) {
  return (
    <div>
      <h3>Interview Coach Feedback</h3>
      <ul>
        {hints.map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ul>
    </div>
  );
}

export default HintsDisplay;