// pages/api/mentis/batch/process.js

import instance from "../../../axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { mediaIds, processType, value } = req.body;

  if (
    !mediaIds ||
    !Array.isArray(mediaIds) ||
    !processType ||
    value === undefined
  ) {
    return res
      .status(400)
      .json({ message: "mediaIds, processType, and value are required" });
  }

  try {
    const processedMedia = await Promise.all(
      mediaIds.map(async (id) => {
        let endpoint = "";
        let payload = {};

        switch (processType) {
          case "resize":
            endpoint = `/media/${id}/resize`;
            payload = { width: value.width, height: value.height };
            break;
          case "compress":
            endpoint = `/media/${id}/compress`;
            payload = { bitrate: value };
            break;
          case "rotate":
            endpoint = `/media/${id}/rotate`;
            payload = { angle: value };
            break;
          default:
            throw new Error("Invalid process type");
        }

        const response = await instance.put(endpoint, payload);

        if (response.status === 200) {
          return {
            id,
            processedUrl:
              processType === "resize"
                ? response.data.resizedUrl
                : processType === "compress"
                  ? response.data.compressedUrl
                  : response.data.rotatedUrl,
          };
        } else {
          throw new Error(`Failed to process media with ID: ${id}`);
        }
      })
    );

    return res.status(200).json({ processedMedia });
  } catch (error) {
    console.error("Batch Processing Error:", error);
    return res.status(500).json({ message: "Batch processing failed" });
  }
};

export default handler;
