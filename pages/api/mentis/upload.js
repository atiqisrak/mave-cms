// pages/api/mentis/upload.js

import formidable from "formidable";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import instance from "../../../axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "/public/uploads");

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res.status(500).json({ message: "Error parsing the files" });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const filePath = path
        .relative(process.cwd(), file.filepath)
        .replace(/\\/g, "/");
      const mediaData = {
        id: uuidv4(),
        file_path: filePath,
        file_type: file.mimetype,
        title: fields.title || file.originalFilename,
      };

      // Upload to your backend's /media API
      const response = await instance.post("/media", mediaData);

      if (response.status === 201) {
        return res.status(201).json(response.data);
      } else {
        // Cleanup uploaded file if backend upload fails
        fs.unlinkSync(file.filepath);
        return res
          .status(response.status)
          .json({ message: "Failed to upload media" });
      }
    } catch (uploadError) {
      console.error("Upload Error:", uploadError);
      // Cleanup uploaded file on error
      fs.unlinkSync(file.filepath);
      return res.status(500).json({ message: "Media upload failed" });
    }
  });
};

export default handler;
