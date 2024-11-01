import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  console.log("API Key:", process.env.OPENAI_API_KEY ? "Exists" : "Not Set");

  try {
    const requestPayload = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that converts natural language descriptions into YAML configurations.",
        },
        {
          role: "user",
          content: `Convert the following description into YAML format:\n\n${prompt}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.3,
    };

    console.log("Request Payload:", requestPayload);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log("Response Data:", response.data);

    const generatedYaml = response.data.choices[0].message.content.trim();

    res.status(200).json({ yaml: generatedYaml });
  } catch (error) {
    console.error(
      "Error generating YAML:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate YAML" });
  }
}
