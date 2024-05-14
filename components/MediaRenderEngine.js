import { Image } from "antd";
import React, { useState, useEffect } from "react";

const MediaRenderEngine = ({ item }) => {
    const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

    const [mediaType, setMediaType] = useState(null);
    const [mediaUrl, setMediaUrl] = useState(null);

    useEffect(() => {
        if (item?.file_type.startsWith("image")) {
            setMediaType("image");
            setMediaUrl(`${MEDIA_URL}/${item?.file_path}`);
        } else if (item?.file_type.startsWith("video")) {
            setMediaType("video");
            setMediaUrl(`${MEDIA_URL}/${item?.file_path}`);
        } else if (item?.file_type.startsWith("audio")) {
            setMediaType("audio");
            setMediaUrl(`${MEDIA_URL}/${item?.file_path}`);
        } else if (item?.file_type.startsWith("application")) {
            setMediaType("application");
            setMediaUrl(`${MEDIA_URL}/${item?.file_path}`);
        } else {
            setMediaType("unknown");
            setMediaUrl(`${MEDIA_URL}/${item?.file_path}`);
        }
    }, [item]);

    return (
        <div>
            {
                mediaType === "image" && (
                    <Image
                        preview={false}
                        src={mediaUrl}
                        alt="MAVE Media"
                        width={250}
                        height={200}
                        style={{
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                    />
                )
            }
            {
                mediaType === "video" && (
                    <video width="200" height="200" autoPlay loop muted>
                        <source src={mediaUrl} type={item?.file_type} />
                        Your browser does not support the video tag.
                    </video>
                )
            }
            {
                mediaType === "audio" && (
                    <audio controls>
                        <source src={mediaUrl} type={item?.file_type} />
                        Your browser does not support the audio element.
                    </audio>
                )
            }
            {
                mediaType === "application" && (
                    <a href={mediaUrl} target="_blank" rel="noreferrer">
                        {item?.title_en}
                        <iframe
                            src={`${mediaUrl}`}
                            type={item?.file_type}
                            style={{
                                width: "300px",
                                height: "40vh",
                            }}
                            title="document"
                        />
                    </a>
                )
            }
            {
                mediaType === "unknown" && (
                    <a href={mediaUrl} target="_blank" rel="noreferrer">
                        {item?.title_en}
                    </a>
                )
            }
        </div>
    );
}

export default MediaRenderEngine;