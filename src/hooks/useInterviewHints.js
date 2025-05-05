import { useEffect, useState } from "react";
import { evaluateResponse } from "../utils/evaluateResponse";
import { getOpenAIResponse } from "../api/openai";


export function useInterviewHints(input, apiKey) {
  const [hints, setHints] = useState([]);

  useEffect(() => {
    if (input.length < 30 || !apiKey) return;

    const timeout = setTimeout(async () => {
      try {
        const customHints = evaluateResponse(input);
        const gptHint = await getOpenAIResponse(
          `Give a short suggestion to improve this TPM interview answer:\n\n${input}`,
          apiKey
        );
        setHints([...customHints, gptHint]);
      } catch (err) {
        console.error("Error getting hints:", err);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [input, apiKey]);

  return hints;
}