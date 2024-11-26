// pages/api/mentis/videos/cut.js

import instance from "../../../axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { mediaId, startTime, endTime } = req.body;

  if (!mediaId || startTime === undefined || endTime === undefined) {
    return res
      .status(400)
      .json({ message: "mediaId, startTime, and endTime are required" });
  }

  try {
    // Send cut request to your backend
    const response = await instance.put(`/media/${mediaId}/cut`, {
      startTime,
      endTime,
    });

    if (response.status === 200) {
      return res.status(200).json({ cutUrl: response.data.cutUrl });
    } else {
      return res
        .status(response.status)
        .json({ message: "Video cutting failed" });
    }
  } catch (error) {
    console.error("Cut Video Error:", error);
    return res.status(500).json({ message: "Video cutting failed" });
  }
};

export default handler;
