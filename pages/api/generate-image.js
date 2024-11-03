import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt, size = "1024x1024", n = 1 } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: n,
      size: size,
    });

    const imageUrls = response.data.map((img) => img.url);
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Error generating image" });
  }
}
