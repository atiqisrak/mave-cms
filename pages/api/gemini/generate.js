// pages/api/gemini/generate.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "object") {
    return res.status(400).json({
      message: "A valid 'prompt' object is required in the request body.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
    const { history, instruction } = prompt;

    // Build the 'contents' array
    const contents = history.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.message }],
    }));

    // Append the latest instruction
    contents.push({
      role: "user",
      parts: [{ text: instruction }],
    });

    const requestBody = {
      contents,
      // Optional: You can include generationConfig, safetySettings, etc.
    };

    // Make the request to Gemini API
    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(
        errorData.error.message || "Failed to get a response from Gemini API."
      );
    }

    const responseData = await apiResponse.json();

    // Extract the text content from the response
    const textContent =
      responseData.candidates[0]?.content.parts
        .map((part) => part.text)
        .join("") || "";

    res.status(200).json({ text: textContent });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ message: error.message });
  }
}
