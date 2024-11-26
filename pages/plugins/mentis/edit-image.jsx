// pages/mentis/edit-image.jsx

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ImageEditor from "../../../components/plugins/mentis/ImageEditor";
import instance from "../../axios";
import { message } from "antd";

const EditImagePage = () => {
  const router = useRouter();
  const { mediaId } = router.query;
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mediaId) {
      const fetchMedia = async () => {
        try {
          const response = await instance.get(`/media/${mediaId}`);
          if (response.status === 200) {
            setImageSrc(
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

  const handleSave = async (editedImage) => {
    try {
      const formData = new FormData();
      formData.append("file", editedImage);
      const response = await instance.put(`/media/${mediaId}/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        message.success("Image updated successfully.");
        router.push("/mentis");
      } else {
        message.error("Failed to update image.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error updating image.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Image</h2>
      {imageSrc ? (
        <ImageEditor imageSrc={imageSrc} onSave={handleSave} />
      ) : (
        <div>No image found.</div>
      )}
    </div>
  );
};

export default EditImagePage;
