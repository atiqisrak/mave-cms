// pages/api/mentis/images/rotate.js

import instance from "../../../axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { mediaId, angle } = req.body;

  if (!mediaId || angle === undefined) {
    return res.status(400).json({ message: "mediaId and angle are required" });
  }

  try {
    // Send rotate request to your backend
    const response = await instance.put(`/media/${mediaId}/rotate`, { angle });

    if (response.status === 200) {
      return res.status(200).json({ rotatedUrl: response.data.rotatedUrl });
    } else {
      return res
        .status(response.status)
        .json({ message: "Image rotate failed" });
    }
  } catch (error) {
    console.error("Rotate Error:", error);
    return res.status(500).json({ message: "Image rotate failed" });
  }
};

export default handler;
