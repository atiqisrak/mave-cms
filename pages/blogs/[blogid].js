import React, { useEffect, useState } from "react";
import instance from "../../axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { Breadcrumb, Button } from "antd";
import {
  BookOutlined,
  CommentOutlined,
  EditOutlined,
  EyeFilled,
  EyeTwoTone,
  PauseCircleOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import RichTextEditor from "../../components/RichTextEditor";
import { useSpeech } from "react-text-to-speech";

export default function BlogPost() {
  const router = useRouter();
  const { blogid } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchBlogData = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get(`/pages/${blogid}`);
      if (response.status === 200) {
        setBlogData(response.data);
      }
    } catch (error) {
      console.log("Error fetching blog data: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogData();
  }, [blogid]);

  console.log("Blog Data: ", blogData);

  const handleSave = async () => {
    isLoading(true);
    try {
      const response = await instance.put(`/pages/${blogid}`, blogData);
      if (response.status === 200) {
        console.log("Blog updated successfully");
      }
    } catch (error) {
      console.log("Error updating blog: ", error);
    }
  };

  const { Text, speechStatus, isInQueue, start, pause, stop } = useSpeech({
    // text: blogData?.body?.map((blog) => blog?.data[0]?.value).join(""),
    text: blogData?.page_name_en,
  });

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      pause();
    } else {
      start();
    }
  };

  return (
    <div
      className="ViewContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "50vw",
        gap: "2rem",
      }}
    >
      <div
        className="meta"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Breadcrumb
          style={{
            backgroundColor: "#f0f2f5",
            padding: "1rem",
            color: "var(--theme)",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <Breadcrumb.Item onClick={() => router.push("/")}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => router.push("/blogs")}>
            Blogs
          </Breadcrumb.Item>
          <Breadcrumb.Item>{blogData.page_name_en}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="meta-details"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
            }}
          >
            {blogData?.page_name_en}
          </h1>
          <p
            style={{
              color: "#6B6B6B",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
            }}
          >
            {blogData?.head?.seoDescription}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
              paddingBottom: "2rem",
            }}
          >
            <Image
              src="/images/profile_avatar.png"
              alt="Google logo"
              width={60}
              height={50}
              style={{
                borderRadius: "50%",
                border: "1px solid #f0f0f0",
              }}
              objectFit="cover"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <h3
                style={{
                  // color: "var(--theme)",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Atiq Israk
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "#6B6B6B",
                    fontSize: "1rem",
                  }}
                >
                  11 min read
                </p>
                {/* divider */}
                <div
                  style={{
                    height: "1rem",
                    width: "1px",
                    backgroundColor: "#6B6B6B",
                  }}
                />
                <p
                  style={{
                    color: "#6B6B6B",
                    fontSize: "1rem",
                  }}
                >
                  {new Date(blogData?.created_at).toDateString()}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 0",
              borderTop: "1px solid #f0f0f0",
              borderBottom: "1px solid #f0f0f0",
              color: "#6B6B6B",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                }}
              >
                <EyeFilled /> 1000 views
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                }}
              >
                <CommentOutlined /> 100 comments
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BookOutlined />
              <Button
                icon={
                  isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />
                }
                // onClick={() => {
                //   setIsPlaying(!isPlaying);
                //   isPlaying ? pause() : start();
                // }}
                onClick={handlePlayPause}
                style={{
                  border: "none",
                }}
              />
              <ShareAltOutlined />
              <EditOutlined onClick={() => setEditMode(!editMode)} />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginBottom: "5rem",
        }}
      >
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {blogData?.medias_mave?.map((media) => {
            return (
              <Image
                key={media.id}
                src={`${MEDIA_URL}/${media.file_path}`}
                alt="blog thumbnail"
                width={800}
                height={400}
              />
            );
          })}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem 3rem",
              margin: "1rem",
              borderRadius: "15px",
              backgroundColor: "white",
            }}
          >
            {blogData?.body?.map((blog, index) => {
              return (
                <div key={index}>
                  {editMode ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <RichTextEditor
                        editMode={true}
                        editorHtml={blog?.data[0]?.value}
                        onChange={(content) => console.log(content)}
                        style={{
                          height: "500px",
                          marginBottom: "3rem",
                          padding: "1rem",
                          backgroundColor: "var(--bg)",
                          color: "var(--textNormal)",
                          borderRadius: "10px",
                          border: "1px solid var(--borderNormal)",
                        }}
                        defaultValue={blog?.data[0]?.value}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "var(--themes)",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            marginBottom: "1rem",
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "var(--theme)",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            marginBottom: "1rem",
                          }}
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: blog?.data[0]?.value }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
