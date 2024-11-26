// pages/api/mentis/videos/compress.js

import instance from "../../../axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { mediaId, bitrate } = req.body;

  if (!mediaId || bitrate === undefined) {
    return res
      .status(400)
      .json({ message: "mediaId and bitrate are required" });
  }

  try {
    // Send compress request to your backend
    const response = await instance.put(`/media/${mediaId}/compress`, {
      bitrate,
    });

    if (response.status === 200) {
      return res
        .status(200)
        .json({ compressedUrl: response.data.compressedUrl });
    } else {
      return res
        .status(response.status)
        .json({ message: "Video compression failed" });
    }
  } catch (error) {
    console.error("Video Compression Error:", error);
    return res.status(500).json({ message: "Video compression failed" });
  }
};

export default handler;
