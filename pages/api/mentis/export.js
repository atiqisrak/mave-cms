// pages/api/mentis/export.js

import instance from "../../../axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { mediaIds, format, quality } = req.body;

  if (!mediaIds || !Array.isArray(mediaIds)) {
    return res.status(400).json({ message: "mediaIds must be an array" });
  }

  try {
    const exportedMedia = await Promise.all(
      mediaIds.map(async (id) => {
        // Fetch media details from your backend
        const response = await instance.get(`/media/${id}`);
        if (response.status !== 200) {
          throw new Error(`Failed to fetch media with ID: ${id}`);
        }

        const media = response.data;

        // Prepare export parameters based on format and quality
        const exportParams = {};
        if (format) exportParams.format = format;
        if (quality) exportParams.quality = quality;

        // Assuming your backend handles export transformations
        const exportResponse = await instance.post(
          `/media/${id}/export`,
          exportParams
        );

        if (exportResponse.status === 200) {
          return {
            id,
            exportedUrl: exportResponse.data.exportedUrl,
          };
        } else {
          throw new Error(`Failed to export media with ID: ${id}`);
        }
      })
    );

    return res.status(200).json({ exportedMedia });
  } catch (error) {
    console.error("Export Error:", error);
    return res.status(500).json({ message: "Failed to export media" });
  }
};

export default handler;
