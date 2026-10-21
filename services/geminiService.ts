
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the API key is provided.
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateBookContent = async (topic: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve(`## API Key Not Configured\n\nTo see the AI-generated content for **${topic}**, please configure your Gemini API key.`);
  }

  const prompt = `
    You are a friendly, encouraging, and fun tutor who is an expert teacher for children.
    Your goal is to explain the math concept of "${topic}" to a child between 6-10 years old.

    Your response must be in Markdown format.

    Structure your explanation like a single page in a fun, digital workbook. Follow these rules:
    1.  **Catchy Title:** Start with a fun, catchy title using a level 2 heading (##). Use emojis.
    2.  **Introduction:** Briefly explain what "${topic}" is in simple, easy-to-understand terms. Use an encouraging tone.
    3.  **Step-by-Step Examples:** Provide 2-3 clear, step-by-step examples. Use bold text for important numbers or concepts. Use blockquotes for the examples to make them stand out.
    4.  **Practice Problem:** End with a "Your Turn!" section that includes one fun practice problem for the child to solve.
    5.  **Tone:** Keep the language simple, positive, and exciting. Use plenty of relevant emojis throughout the text.
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    return `Oh no! The eBook seems to be stuck right now. We couldn't generate the lesson for "${topic}". Please try again later.`;
  }
};