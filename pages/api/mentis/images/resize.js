// pages/api/mentis/images/resize.js

import instance from "../../../axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { mediaId, width, height } = req.body;

  if (!mediaId || (!width && !height)) {
    return res
      .status(400)
      .json({ message: "mediaId and width or height are required" });
  }

  try {
    // Send resize request to your backend
    const response = await instance.put(`/media/${mediaId}/resize`, {
      width,
      height,
    });

    if (response.status === 200) {
      return res.status(200).json({ resizedUrl: response.data.resizedUrl });
    } else {
      return res
        .status(response.status)
        .json({ message: "Image resize failed" });
    }
  } catch (error) {
    console.error("Resize Error:", error);
    return res.status(500).json({ message: "Image resize failed" });
  }
};

export default handler;
