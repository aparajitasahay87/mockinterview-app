// src/components/AnswerBox.js
import React from "react";

function AnswerBox({ input, setInput }) {
  return (
    <div className="answer-box">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer here..."
      />
    </div>
  );
}

export default AnswerBox;
