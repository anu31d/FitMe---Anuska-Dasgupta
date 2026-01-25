
import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;
  private model: string = 'gemini-3-flash-preview';

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getPersonalizedMotivation(profile: UserProfile, energy: number, mood: number): Promise<string> {
    const prompt = `
      User Profile:
      - Name: ${profile.name}
      - Goals: ${profile.goals.join(', ')}
      - Conditions: ${profile.conditions.join(', ') || 'None'}
      - Today's Check-in: Energy level ${energy}/10, Mood level ${mood}/10

      Write a short, empathetic, and highly motivating message (max 2 sentences). 
      IMPORTANT: Strictly avoid all Markdown formatting like bold asterisks (**), italics, or lists. Respond in clean, plain, elegant text.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt
      });
      return response.text?.replace(/\*/g, '') || "Believe in the process. Your future self is thanking you already.";
    } catch (e) {
      return "Every step counts. Let's make today meaningful.";
    }
  }

  async chat(profile: UserProfile, history: { role: 'user' | 'model', text: string }[], message: string): Promise<string> {
    const systemInstruction = `
      You are VigorAI, a luxury fitness coach. 
      User Profile: ${profile.name}, Age ${profile.age}, Weight ${profile.weight}kg, Height ${profile.height}cm.
      Conditions: ${profile.conditions.join(', ') || 'None'}.
      Goals: ${profile.goals.join(', ')}.
      
      STRICT RULES:
      1. DO NOT use Markdown formatting like bold asterisks (**), hashtags (#), or bullet points.
      2. Respond in clean, plain, normal text that feels professional and empathetic.
      3. If recommending exercises, just describe them naturally in sentences.
      4. Acknowledge PCOS/Hypertension safely without using scary terminology.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: [
          ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: { systemInstruction }
      });
      // Final fallback to strip asterisks if the model ignores the instruction
      return response.text?.replace(/\*/g, '') || "I'm processing that. Let's focus on your next movement.";
    } catch (e) {
      return "I apologize, I'm having trouble connecting right now. Let's keep moving towards your goal.";
    }
  }
}

export const aiService = new GeminiService();
