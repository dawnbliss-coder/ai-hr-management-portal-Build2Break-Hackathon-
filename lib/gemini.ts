import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "Missing GEMINI_API_KEY environment variable. Add it to .env.local (see .env.local.example)."
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Text generation (chat, summaries, JSON extraction, etc).
export async function callGemini(
  content: string,
  modelName: string = "gemini-2.5-flash"
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: content,
    });
    return response.text ?? "";
  } catch (error) {
    console.error("GEMINI API ERROR:", error);
    throw error;
  }
}

// Vector embeddings. Uses gemini-embedding-001 (text-embedding-004 was
// deprecated by Google on Jan 14, 2026) truncated to 768 dimensions via
// Matryoshka Representation Learning so it matches a MongoDB Atlas Vector
// Search index built with numDimensions: 768. If you created your index
// with a different dimension count, update EMBEDDING_DIMENSIONS to match.
const EMBEDDING_DIMENSIONS = 768;

export async function getEmbedding(content: string): Promise<number[]> {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: content,
      config: { outputDimensionality: EMBEDDING_DIMENSIONS },
    });
    const values = response.embeddings?.[0]?.values;
    if (!values) {
      throw new Error("No embedding values returned from Gemini API");
    }
    return values;
  } catch (error) {
    console.error("GEMINI EMBEDDING ERROR:", error);
    throw error;
  }
}
