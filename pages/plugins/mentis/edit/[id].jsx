// pages/mentis/edit/[id].jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal, Spin, message } from "antd";
import instance from "../../../../axios";
import ImageEditor from "../../../../components/plugins/mentis/ImageEditor";
import VideoEditor from "../../../../components/plugins/mentis/VideoEditor";

const EditMediaPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState("image"); // 'image' or 'video'

  useEffect(() => {
    if (id) {
      fetchMedia();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchMedia = async () => {
    try {
      const response = await instance.get(`/media/${id}`);
      if (response.status === 200) {
        setMedia(response.data);
        setEditMode(
          response.data.file_type.startsWith("image") ? "image" : "video"
        );
      } else {
        message.error("Failed to fetch media details.");
        router.push("/mentis");
      }
    } catch (error) {
      console.error("Fetch Media Error:", error);
      message.error("An error occurred while fetching media.");
      router.push("/mentis");
    }
    setLoading(false);
  };

  const handleSave = async (editedUrl) => {
    try {
      // Update media URL or send the edited media back to the backend
      // This depends on how your backend handles updates
      const payload = {
        file_path: editedUrl,
      };
      const response = await instance.put(`/media/${id}`, payload);
      if (response.status === 200) {
        message.success("Media updated successfully!");
        router.push("/mentis");
      } else {
        message.error("Failed to update media.");
      }
    } catch (error) {
      console.error("Save Media Error:", error);
      message.error("An error occurred while saving media.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading media..." />
      </div>
    );
  }

  if (!media) {
    return null;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Edit Media</h2>
        <Button onClick={() => router.push("/mentis")} type="default">
          Back to Dashboard
        </Button>
      </div>
      <div className="flex flex-col items-center">
        {editMode === "image" ? (
          <ImageEditor
            imageSrc={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
            onSave={handleSave}
          />
        ) : (
          <VideoEditor
            videoSrc={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default EditMediaPage;
