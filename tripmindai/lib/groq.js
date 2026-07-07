import Groq from 'groq-sdk';

export function getGroqClient() {
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
}

// Text model used for itinerary / budget-plan generation.
export const GROQ_TEXT_MODEL = 'llama-3.3-70b-versatile';

// Vision-capable model used for analyzing uploaded images
// (e.g. a receipt to auto-log an expense, or a landmark photo for trip ideas).
export const GROQ_VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

