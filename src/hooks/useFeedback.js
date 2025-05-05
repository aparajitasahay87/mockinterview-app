/*import { useState, useEffect } from "react";
import { getOpenAIResponse } from "../api/openai";
const useFeedback = (answer) => {

   const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (answer.length < 30) return;

    // Custom feedback logic
    setFeedback("Your answer is solid. Try to emphasize impact more.");

    const fetchFeedback = async () => {
      try {
        const gptFeedback = await getOpenAIResponse(
          `Give a short suggestion to improve this TPM interview answer:\n\n${answer}`
        );
        setFeedback(gptFeedback);
      } 
    catch (error) {
        console.error("Error getting OpenAI feedback:", error);
        setFeedback("Error fetching feedback. Please try again.");
      }
    };

    fetchFeedback();
  }, [answer]);

  return feedback;
};

export default useFeedback;
*/
// src/hooks/useFeedback.js
import { useState } from 'react';

export default function useFeedback() {
  const [feedback, setFeedback] = useState([]);
  return [feedback, setFeedback];
}

