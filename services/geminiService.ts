import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_WORKFLOWS } from "../mockData";

// Initialize Gemini
// Note: In a real app, strict error handling for missing API keys is needed.
// For this demo, we assume the environment variable is injected.
const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const geminiService = {
  isAvailable: () => !!ai,

  async searchWorkflowsWithAI(query: string): Promise<string[]> {
    if (!ai) {
      console.warn("Gemini API Key missing");
      return [];
    }

    // We send a simplified list of workflows to Gemini to decide which ones match the user's intent
    const workflowSummaries = MOCK_WORKFLOWS.map(w => ({
      id: w.id,
      title: w.title,
      description: w.description,
      tags: w.tags.join(', ')
    }));

    const prompt = `
      You are an intelligent search assistant for an automation workflow marketplace.
      User Query: "${query}"
      
      Here is the list of available workflows in JSON format:
      ${JSON.stringify(workflowSummaries)}
      
      Return a JSON object containing an array of 'matchedIds' corresponding to the workflows that best match the user's query. 
      Sort them by relevance. If no relevant matches are found, return an empty array.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchedIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      });

      const jsonResponse = JSON.parse(response.text || '{"matchedIds": []}');
      return jsonResponse.matchedIds || [];

    } catch (error) {
      console.error("Gemini Search Error:", error);
      return [];
    }
  }
};
