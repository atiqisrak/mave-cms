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

5. **JSON Validity:**
   - Ensure that the JSON is syntactically correct. Avoid trailing commas, comments, or any invalid JSON syntax.

6. **Response Format:**
   - Start with a brief confirmation text.
   - Provide the JSON configuration within triple backticks and specify the language as \`json\`.

**Example Response:**

Sure, here is the JSON configuration for your portfolio page for Atiq Israk:

\`\`\`json
{
  "page_name_en": "Portfolio - Atiq Israk",
  "page_name_bn": "পরিচয়পত্র - আতিক ইসরাক",
  "type": "Page",
  "head": [
    {
      "pageType": "Page",
      "metaTitle": "Portfolio of Atiq Israk",
      "metaDescription": "Showcasing the professional portfolio of Atiq Israk.",
      "keywords": [
        "Atiq Israk",
        "Portfolio",
        "Professional"
      ],
      "metaImage": null,
      "metaImageAlt": null
    }
  ],
  "slug": "portfolio-atiq-israk",
  "meta_title": "Portfolio of Atiq Israk",
  "meta_description": "Showcasing the professional portfolio of Atiq Israk.",
  "keywords": [
    "Atiq Israk",
    "Portfolio",
    "Professional"
  ],
  "body": [
    {
      "_id": "550e8400-e29b-41d4-a716-446655440000",
      "sectionTitle": "About Me",
      "data": [
        {
          "type": "title",
          "_id": "550e8400-e29b-41d4-a716-446655440001",
          "value": "Atiq Israk - Professional Portfolio"
        },
        {
          "type": "description",
          "_id": "550e8400-e29b-41d4-a716-446655440002",
          "value": "Welcome to my professional portfolio. Here you can find information about my skills, experience, and projects."
        },
        {
          "type": "media",
          "_id": "550e8400-e29b-41d4-a716-446655440003",
          "id": 123
        },
        {
          "type": "menu",
          "_id": "550e8400-e29b-41d4-a716-446655440004",
          "id": 456
        },
        {
          "type": "navbar",
          "_id": "550e8400-e29b-41d4-a716-446655440005",
          "id": 789
        },
        {
          "type": "slider",
          "_id": "550e8400-e29b-41d4-a716-446655440006",
          "id": 101
        },
        {
          "type": "card",
          "_id": "550e8400-e29b-41d4-a716-446655440007",
          "id": 112
        },
        {
          "type": "footer",
          "_id": "550e8400-e29b-41d4-a716-446655440008",
          "id": 131
        }
      ]
    }
  ],
  "additional": [
    {
      "pageType": "Page",
      "metaTitle": "Additional Portfolio Details",
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

    // Fetch API settings to get the OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      console.error("OpenAI API key is not defined in environment variables.");
      return res
        .status(500)
        .json({ error: "OpenAI API key is not configured." });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
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

    // Prepare response data
    const responseData = {
      text,
      json: parsedJson,
      isValid: valid,
    };

    // If not valid, include validation errors
    if (!valid) {
      responseData.validationErrors = validate.errors;
      console.error("JSON Schema Validation Errors:", validate.errors);
    }

    // Send the response with isValid flag
    res.status(200).json(responseData);
  } catch (error) {
    console.error(
      "Error generating JSON:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate JSON" });
  }
}
