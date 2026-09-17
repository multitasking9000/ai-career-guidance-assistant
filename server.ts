import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // Server-side Gemini API route for live LLM execution
  app.post("/api/gemini-tot", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Missing prompt string in payload" });
      }

      const client = getGenAI();
      if (!client) {
        return res.status(503).json({
          error: "GEMINI_API_KEY is not configured on the server. Falling back to local Prototype ToT Engine."
        });
      }

      // Call Gemini 2.5 Flash with strict temperature
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.2,
          systemInstruction: "You are an automated AI Career Guidance Assistant prototype engine. Output strictly using the 4-section Markdown template requested with zero conversational greetings or preamble."
        }
      });

      const responseText = response.text || "";
      return res.json({
        success: true,
        markdown: responseText
      });
    } catch (error: any) {
      console.error("Gemini API execution error:", error);
      return res.status(500).json({
        error: error?.message || "Failed to generate guidance from Gemini API"
      });
    }
  });

  // Vite middleware in development vs production static serve
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Career Guidance Engine server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal server start error:", err);
  process.exit(1);
});
