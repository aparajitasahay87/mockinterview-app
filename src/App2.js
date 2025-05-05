import React, { useState, useEffect } from "react";
import { questions } from "./data/questions";  // Importing the questions from the data file
import FeedbackDisplay from "./components/FeedbackDisplay";  // Importing FeedbackDisplay component
import Timer from "./components/Timer";  // Importing Timer component
import SubmitButton from "./components/SubmitButton";  // Importing SubmitButton component
import { validateAnswer } from "./utils/answerValidation";  // Importing validation utility
import { getOpenAIFeedback } from "./api/openAI";  // Importing the OpenAI API service

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // Tracks the current question index
  const [answer, setAnswer] = useState("");  // Tracks the user's answer
  const [feedback, setFeedback] = useState("");  // Holds the feedback received from OpenAI
  const [isTimerExpired, setIsTimerExpired] = useState(false);  // Flag for timer expiration
  const [loading, setLoading] = useState(false);  // Flag for loading state
  const [apiKey, setApiKey] = useState("your-openai-api-key");  // API key for OpenAI service

  const currentQuestion = questions[currentQuestionIndex];  // Fetches the current question from the questions array

  // Handle changes in the answer textarea
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  // Handle the submit button click
  const handleSubmit = async () => {
    const error = validateAnswer(answer);  // Validate the answer before submission
    if (error) {
      alert(error);  // If validation fails, show an alert
      return;
    }

    setLoading(true);  // Set loading state to true

    // Get feedback from OpenAI based on the answer
    const feedbackFromAPI = await getOpenAIFeedback(answer, apiKey);
    setFeedback(feedbackFromAPI);  // Update the feedback state with the API response

    setLoading(false);  // Set loading state to false
    setAnswer("");  // Reset the answer field after submission

    // Move to the next question or show completion message if all questions are answered
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("You have completed the interview!");  // Show completion message
    }
  };

  // Handle timeout for the timer
  const handleTimeOut = () => {
    setIsTimerExpired(true);
  };

  return (
    <div className="app">
      <h1>Mock Interview</h1>

      <div className="question-container">
        <p>{currentQuestion.question}</p>
        <textarea value={answer} onChange={handleAnswerChange}></textarea>
      </div>

      <Timer timeLimit={60} onTimeOut={handleTimeOut} />  {/* Timer component with 60-second limit */}

      <SubmitButton onClick={handleSubmit} />  {/* Submit button */}

      {loading && <p>Loading feedback...</p>}  {/* Show loading text if feedback is being fetched */}
      
      {feedback && <FeedbackDisplay feedback={feedback} />}  {/* Show the feedback once it's fetched */}
    </div>
  );
}

export default App;
import React, { useState } from "react";
import FeedbackDisplay from "./components/FeedbackDisplay";
import AnswerBox from "./components/AnswerBox";
import ProgressTracker from "./components/ProgressTracker";
import useFeedback from "./hooks/useFeedback";
import { questions } from "./data/questions";  // Importing the updated questions array
import "./styles/global.css"; // Import global CSS

function App() {
  const [answer, setAnswer] = useState(""); // Answer input from user
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const totalQuestions = questions.length; // Total number of questions based on the length of the questions array
  const currentQuestion = questions[currentQuestionIndex]; // Get current question dynamically based on the index
  const feedback = useFeedback(answer); // Get feedback using the custom hook

  // Handle answer submission (you could add logic to move to next question here)
  const handleSubmit = () => {
    if (answer.trim() === "") {
      alert("Please provide an answer.");
      return;
    }

    // Process the answer, e.g., move to next question
    setAnswer(""); // Clear the answer input after submitting
    setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
  };

  return (
    <div className="app">
      <h1>TPM Mock Interview Coach</h1>

      {/* Progress Tracker to show how many questions have been answered */}
      <ProgressTracker
        currentQuestion={currentQuestionIndex + 1} // Display question number (index + 1)
        totalQuestions={totalQuestions}
      />

      {/* Display the current question */}
      <div className="question">
        <h2>{currentQuestion ? currentQuestion.question : "No more questions"}</h2>
      </div>

      {/* Display the answer input box */}
      <AnswerBox input={answer} setInput={setAnswer} />

      {/* Display the feedback from OpenAI */}
      <FeedbackDisplay feedback={feedback} />

      {/* Submit button */}
      <button className="submit-button" onClick={handleSubmit}>
        Submit Answer
      </button>

      {/* Display message when all questions are answered */}
      {currentQuestionIndex >= totalQuestions && (
        <div className="completion-message">
          <h2>Congratulations! You've completed the interview.</h2>
        </div>
      )}
    </div>
  );
}

export default App;