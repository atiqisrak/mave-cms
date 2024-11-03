import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt, model = "dall-e-2", size, quality, style } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Validate parameters based on the selected model
  const validSizes = {
    "dall-e-2": ["256x256", "512x512", "1024x1024"],
    "dall-e-3": ["1024x1024", "1792x1024", "1024x1792"],
  };

  const validQualities = ["standard", "hd"];
  const validStyles = ["vivid", "natural"];

  if (!validSizes[model]?.includes(size)) {
    return res
      .status(400)
      .json({ message: "Invalid size for the selected model." });
  }

  if (model === "dall-e-3" && quality && !validQualities.includes(quality)) {
    return res.status(400).json({ message: "Invalid quality option." });
  }

  if (model === "dall-e-3" && style && !validStyles.includes(style)) {
    return res.status(400).json({ message: "Invalid style option." });
  }

  try {
    const response = await openai.images.generate({
      prompt,
      model,
      size,
      ...(model === "dall-e-3" && quality ? { quality } : {}),
      ...(model === "dall-e-3" && style ? { style } : {}),
    });

    const imageUrls = response.data.map((img) => img.url);
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Error generating image" });
  }
}
