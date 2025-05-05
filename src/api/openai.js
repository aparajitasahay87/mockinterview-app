// src/api/openai.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Store your key in .env
  dangerouslyAllowBrowser: true // Only for development; for production, proxy through server
});

export async function getFeedbackFromOpenAI(userAnswer, question) {
  const systemPrompt = `You are an interview coach. Evaluate the following response for the question: "${question}"`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userAnswer },
      ],
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI error:", err);
    return "⚠️ There was an error generating feedback. Please try again.";
  }
}
