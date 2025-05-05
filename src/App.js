import React, { useState } from "react";
import questions from "./data/questions";
import useFeedback from "./hooks/useFeedback";
import AnswerBox from "./components/AnswerBox";
import FeedbackDisplay from "./components/FeedbackDisplay";
import "./styles/global.css";

// Debug logs to check imports
console.log("questions:", questions);
console.log("useFeedback:", useFeedback);
console.log("AnswerBox:", AnswerBox);
console.log("FeedbackDisplay:", FeedbackDisplay);

function App() {
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const totalQuestions = Array.isArray(questions) ? questions.length : 0;
  const currentQuestion = questions[currentQuestionIndex];
  const feedback = useFeedback(answer);

  console.log("Current answer:", answer);
  console.log("Feedback:", feedback);

  // Check for invalid question data
  if (!Array.isArray(questions) || totalQuestions === 0) {
    return <div>Error: No questions found. Please check your questions.js file.</div>;
  }

  return (
    <div className="app">
      <h1>TPM Mock Interview Coach</h1>

      {/* Question display */}
      <div className="question">
        <h2>{currentQuestion?.question || "No question available"}</h2>
      </div>

      {/* Answer input and feedback */}
      <AnswerBox input={answer} setInput={setAnswer} />
      <FeedbackDisplay feedback={feedback} />
    </div>
  );
}

export default App;
