
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME, PROMPT_TEMPLATE } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set. Please ensure the API_KEY environment variable is configured.");
  // Potentially throw an error or handle this state in the UI
  // For this example, we'll allow the app to load but API calls will fail.
}

const ai = new GoogleGenAI({ apiKey: API_KEY || " " }); // Provide a dummy key if not set to avoid constructor error, actual calls will fail.

export const fetchDecisionFromGemini = async (userQuestion: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key not configured. Cannot fetch decision.");
  }
  
  try {
    const fullPrompt = PROMPT_TEMPLATE.replace("{USER_QUESTION}", userQuestion);
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: fullPrompt,
      config: {
        temperature: 0.8, // A bit more creative/varied responses
        topP: 0.9,
        topK: 40,
        // thinkingConfig: { thinkingBudget: 0 } // For faster, potentially less nuanced responses if needed
      }
    });

    const text = response.text;
    if (text) {
      return text.trim();
    } else {
      throw new Error("Received an empty response from AI.");
    }
  } catch (error) {
    console.error("Error fetching decision from Gemini:", error);
    // It's good practice to check error type and provide more specific messages
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with AI.");
  }
};
