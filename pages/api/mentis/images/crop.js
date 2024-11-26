// pages/api/mentis/images/crop.js

import instance from "../../../axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { mediaId, crop } = req.body;

  if (!mediaId || !crop) {
    return res
      .status(400)
      .json({ message: "mediaId and crop data are required" });
  }

  try {
    // Send crop request to your backend
    const response = await instance.put(`/media/${mediaId}/crop`, { crop });

    if (response.status === 200) {
      return res.status(200).json({ croppedUrl: response.data.croppedUrl });
    } else {
      return res.status(response.status).json({ message: "Image crop failed" });
    }
  } catch (error) {
    console.error("Crop Error:", error);
    return res.status(500).json({ message: "Image crop failed" });
  }
};

export default handler;
