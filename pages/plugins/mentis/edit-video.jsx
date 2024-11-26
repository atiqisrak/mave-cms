// pages/mentis/edit-video.jsx

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import VideoEditor from "../../../components/plugins/mentis/VideoEditor";
import instance from "../../axios";
import { message } from "antd";

const EditVideoPage = () => {
  const router = useRouter();
  const { mediaId } = router.query;
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mediaId) {
      const fetchMedia = async () => {
        try {
          const response = await instance.get(`/media/${mediaId}`);
          if (response.status === 200) {
            setVideoSrc(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/${response.data.file_path}`
            );
          } else {
            message.error("Failed to fetch media.");
          }
        } catch (error) {
          console.error(error);
          message.error("Error fetching media.");
        } finally {
          setLoading(false);
        }
      };
      fetchMedia();
    }
  }, [mediaId]);

  const handleSave = async (editedVideo) => {
    try {
      const formData = new FormData();
      formData.append("file", editedVideo);
      const response = await instance.put(`/media/${mediaId}/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        message.success("Video updated successfully.");
        router.push("/mentis");
      } else {
        message.error("Failed to update video.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error updating video.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Video</h2>
      {videoSrc ? (
        <VideoEditor videoSrc={videoSrc} onSave={handleSave} />
      ) : (
        <div>No video found.</div>
      )}
    </div>
  );
};

export default EditVideoPage;
