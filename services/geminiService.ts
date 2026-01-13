
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `你是一位世界頂級的 AI 數學家與教育者。
你擅長用簡單、生動的比喻（如：旋鈕機器、摺紙、曲線擬合）來解釋複雜的 LLM 數學原理。
你的回答必須使用「繁體中文」。
背景知識：使用者正在觀看一個關於從 y=ax+b 到 LLM 智慧湧現的教學網頁。
概念包含：線性回歸、權重矩陣 W、偏置 b、非線性激活函數 σ、維度災難、分散式表示與湧現現象。`;

export const getGeminiResponse = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，目前無法連線到 AI 大腦。請檢查網路或稍後再試。";
  }
};
