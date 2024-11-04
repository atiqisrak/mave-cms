// pages/api/mave-cloudinary/[resourceType].js

import axios from "axios";
import rateLimit from "../../../lib/rateLimit";

export default async function handler(req, res) {
  // Apply rate limiting
  await new Promise((resolve, reject) => {
    rateLimit(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });

  // Allow only GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { resourceType } = req.query; // Extract resourceType from the URL
  const allowedResourceTypes = ["image", "video", "raw"]; // Define allowed resource types

  // Validate resourceType
  if (!allowedResourceTypes.includes(resourceType)) {
    return res.status(400).json({ message: "Invalid resource type" });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Construct the Cloudinary API URL
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}`;

  // Extract pagination cursor from query parameters
  const nextCursor = req.query.next_cursor || null;

  // Set up parameters
  const params = {
    max_results: 50, // Adjust as needed
  };

  if (nextCursor) {
    params.next_cursor = nextCursor;
  }

  try {
    // Make a GET request to Cloudinary's API with Basic Auth
    const response = await axios.get(url, {
      auth: {
        username: apiKey,
        password: apiSecret,
      },
      params,
    });

    // Respond with the fetched resources and next_cursor
    res.status(200).json({
      resources: response.data.resources,
      next_cursor: response.data.next_cursor || null,
    });
  } catch (error) {
    console.error(
      "Error fetching Cloudinary media:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Error fetching media items" });
  }
}
