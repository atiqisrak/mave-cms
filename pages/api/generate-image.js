// pages/api/generate-image.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Please provide a prompt." });
  }

  // Initialize OpenAI with your API key
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data.data[0].url;

    // Send back the image URL
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error.response.data);
    res.status(500).json({ error: "Failed to generate image." });
  }
}
