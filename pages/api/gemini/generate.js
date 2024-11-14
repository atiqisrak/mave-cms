// pages/api/gemini/generate.js

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  const { prompt, history } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ message: "A valid 'prompt' is required in the request body." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 800, // Adjust as needed
      responseMimeType: "text/plain",
    };

    // const chatSession = model.startChat({
    //   generationConfig,
    //   history: [],
    // });

    // Build the conversation history
    const formattedHistory = history.map((msg) => ({
      author: msg.sender === "user" ? "USER" : "ASSISTANT",
      content: msg.message,
    }));

    const chatSession = model.startChat({
      generationConfig,
      history: formattedHistory,
    });

    const result = await chatSession.sendMessage(prompt);

    const generatedText = result.response.text();

    if (!generatedText) {
      console.warn("Gemini API returned an empty response.");
      return res.status(200).json({ text: "No response generated." });
    }

    res.status(200).json({ text: generatedText });
  } catch (error) {
    console.error(
      "Error communicating with Gemini API:",
      error.response ? error.response.data : error.message
    );

    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      "Failed to generate content.";

    res.status(500).json({ message: errorMessage });
  }
}
