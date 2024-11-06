// pages/api/conversational-json.js

import axios from "axios";
import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";

// Function to check if a string is a valid UUIDv4
const isValidUUIDv4 = (uuid) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

// Function to traverse and fix UUIDs in the JSON
const traverseAndFixUUIDs = (obj) => {
  if (Array.isArray(obj)) {
    obj.forEach((item) => traverseAndFixUUIDs(item));
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (key === "_id") {
        if (!isValidUUIDv4(obj[key])) {
          obj[key] = uuidv4();
        }
      } else {
        traverseAndFixUUIDs(obj[key]);
      }
    }
  }
};

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
    // Load JSON Schema
    const schemaPath = path.join(process.cwd(), "schemas", "pageSchema.json");
    const schemaData = fs.readFileSync(schemaPath, "utf-8");
    const schema = JSON.parse(schemaData);

    // Initialize AJV
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);

    // Enhanced Prompt with UUID Generation Instruction
    const systemPrompt = `You are a helpful assistant that generates JSON configurations for web pages based on user descriptions. Please adhere to the following guidelines strictly:

1. **Structure:** The JSON should follow this structure:

${JSON.stringify(
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
        _id: "UUIDv4",
        sectionTitle: "Section Title",
        data: [
          { type: "title", _id: "UUIDv4", value: "Title Value" },
          {
            type: "description",
            _id: "UUIDv4",
            value: "Description Value",
          },
          { type: "media", _id: "UUIDv4", id: 123 },
          { type: "menu", _id: "UUIDv4", id: 456 },
          { type: "navbar", _id: "UUIDv4", id: 789 },
          { type: "slider", _id: "UUIDv4", id: 101 },
          { type: "card", _id: "UUIDv4", id: 112 },
          { type: "footer", _id: "UUIDv4", id: 131 },
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
)}

2. **UUID Generation:**
   - All \`_id\` fields must be valid UUIDv4 strings. Use the format: \`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\` where \`y\` is one of \`8\`, \`9\`, \`A\`, or \`B\`.
   - **Example:** \`"550e8400-e29b-41d4-a716-446655440000"\`

3. **Slug Pattern:**
   - The \`slug\` field must consist of lowercase letters, numbers, and hyphens only (e.g., \`"marketing-agency-page"\`).

4. **No Additional Properties:**
   - Do not include any properties not defined in the provided structure.

5. **Response Format:**
   - Start with a brief confirmation text.
   - Provide the JSON configuration within triple backticks and specify the language as \`json\`.

**Example Response:**

Sure, here is the JSON configuration for your marketing agency page with 8 sections:

\`\`\`json
{
  "page_name_en": "Marketing Agency",
  "page_name_bn": "মার্কেটিং এজেন্সি",
  "type": "Page",
  "head": [
    {
      "pageType": "Page",
      "metaTitle": "Marketing Excellence",
      "metaDescription": "Leading marketing agency providing top-notch services.",
      "keywords": ["marketing", "agency", "digital marketing"],
      "metaImage": "https://example.com/meta-image.jpg",
      "metaImageAlt": "Marketing Agency Meta Image"
    }
  ],
  "slug": "marketing-agency",
  "meta_title": "Marketing Excellence",
  "meta_description": "Leading marketing agency providing top-notch services.",
  "keywords": ["marketing", "agency", "digital marketing"],
  "body": [
    {
      "_id": "550e8400-e29b-41d4-a716-446655440000",
      "sectionTitle": "Our Services",
      "data": [
        {
          "type": "title",
          "_id": "550e8400-e29b-41d4-a716-446655440001",
          "value": "Comprehensive Marketing Solutions"
        },
        {
          "type": "description",
          "_id": "550e8400-e29b-41d4-a716-446655440002",
          "value": "We offer a wide range of marketing services tailored to your business needs."
        },
        {
          "type": "media",
          "_id": "550e8400-e29b-41d4-a716-446655440003",
          "id": 123
        },
        // ...additional components
      ]
    },
    // ...additional sections
  ],
  "additional": [
    {
      "pageType": "Page",
      "metaTitle": "Additional Marketing Details",
      "metaDescription": null,
      "keywords": [],
      "metaImage": null,
      "metaImageAlt": null
    }
  ],
  "status": 1
}
\`\`\`
`;

    const requestPayload = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      max_tokens: 1500,
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

    const aiResponse = response.data.choices[0].message.content.trim();

    // Function to extract text and JSON from the AI response
    const extractResponse = (text) => {
      const jsonRegex = /```json\s+([\s\S]*?)\s+```/;
      const match = text.match(jsonRegex);

      if (match) {
        const jsonString = match[1];
        const textBeforeJson = text.substring(0, match.index).trim();

        return {
          text: textBeforeJson,
          json: jsonString,
        };
      } else {
        // If no JSON is found, return the whole text
        return {
          text,
          json: null,
        };
      }
    };

    const { text, json: generatedJson } = extractResponse(aiResponse);

    if (!generatedJson) {
      return res.status(400).json({
        error: "No JSON found in the AI response.",
        details:
          "Ensure that the AI includes JSON within ```json``` code blocks.",
      });
    }

    // Parse the JSON
    let parsedJson;
    try {
      parsedJson = JSON.parse(generatedJson);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError.message);
      return res
        .status(400)
        .json({ error: "Generated content is not valid JSON." });
    }

    // Traverse and fix UUIDs
    traverseAndFixUUIDs(parsedJson);

    // Validate the generated JSON
    const valid = validate(parsedJson);
    if (!valid) {
      console.error("JSON Schema Validation Errors:", validate.errors);
      return res.status(400).json({
        error: "Generated JSON does not conform to the required schema.",
        details: validate.errors,
      });
    }

    // Send the JSON object instead of a string
    res.status(200).json({ text, json: parsedJson });
  } catch (error) {
    console.error(
      "Error generating JSON:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate JSON" });
  }
}
