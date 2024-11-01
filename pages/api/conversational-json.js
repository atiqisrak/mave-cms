// pages/api/conversational-json.js

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: "Messages are required and should be an array" });
  }

  try {
    const requestPayload = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates JSON configurations for web pages based on user descriptions. The JSON should follow this structure:\n\n" +
            JSON.stringify(
              {
                page_name_en: "Page Title",
                page_name_bn: "Page Title",
                type: "Page",
                head: [
                  {
                    pageType: "Page",
                    metaTitle: "Meta Title",
                    metaDescription: "Meta Description",
                    keywords: [],
                    metaImage: null,
                    metaImageAlt: null,
                  },
                ],
                slug: "page-slug",
                meta_title: "Meta Title",
                meta_description: "Meta Description",
                keywords: ["keyword1", "keyword2"],
                body: [
                  {
                    _id: uuidv4(),
                    sectionTitle: "Section Title",
                    data: [
                      { type: "title", _id: uuidv4(), value: "Title Value" },
                      {
                        type: "description",
                        _id: uuidv4(),
                        value: "Description Value",
                      },
                      { type: "media", _id: uuidv4(), id: 123 },
                      { type: "menu", _id: uuidv4(), id: 456 },
                      { type: "navbar", _id: uuidv4(), id: 789 },
                      { type: "slider", _id: uuidv4(), id: 101 },
                      { type: "card", _id: uuidv4(), id: 112 },
                      { type: "footer", _id: uuidv4(), id: 131 },
                    ],
                  },
                ],
                additional: [
                  {
                    pageType: "Page",
                    metaTitle: "Additional Meta Title",
                    metaDescription: null,
                    keywords: [],
                    metaImage: null,
                    metaImageAlt: null,
                  },
                ],
                status: 1,
              },
              null,
              2
            ),
        },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: 0.3,
    };

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

    const generatedJson = response.data.choices[0].message.content.trim();

    res.status(200).json({ json: generatedJson });
  } catch (error) {
    console.error(
      "Error generating JSON:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate JSON" });
  }
}
