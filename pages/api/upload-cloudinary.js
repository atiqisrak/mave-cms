// pages/api/upload-cloudinary.js

import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Disable Next.js's default body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary with your credentials from environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = new IncomingForm({
    multiples: true,
    uploadDir: os.tmpdir(),
    keepExtensions: true,
  });
  try {
    // Parse the incoming form data
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Handle single and multiple file uploads
    const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];

    // Upload each file to Cloudinary
    const uploadPromises = uploadedFiles.map((file) => {
      return cloudinary.uploader.upload(file.filepath, {
        folder: "uploads", // Optional: specify folder in Cloudinary
        resource_type: "auto", // Let Cloudinary detect the type
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Clean up temporary files
    uploadedFiles.forEach((file) => {
      fs.unlink(file.filepath, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    });

    res.status(200).json(uploadResults);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ message: "Error uploading to Cloudinary" });
  }
}
