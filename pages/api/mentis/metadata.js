// pages/api/mentis/metadata.js

import instance from "../../../axios";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { mediaId } = req.query;

  if (!mediaId) {
    return res.status(400).json({ message: "mediaId is required" });
  }

  try {
    // Fetch media metadata from your backend
    const response = await instance.get(`/media/${mediaId}/metadata`);

    if (response.status === 200) {
      return res.status(200).json({ metadata: response.data });
    } else {
      return res
        .status(response.status)
        .json({ message: "Failed to fetch metadata" });
    }
  } catch (error) {
    console.error("Metadata Fetch Error:", error);
    return res.status(500).json({ message: "Failed to fetch metadata" });
  }
};

export default handler;
