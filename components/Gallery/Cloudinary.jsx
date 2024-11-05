// components/Cloudinary.js

import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Alert, Card, Select, Button, Input } from "antd";
import Image from "next/image";
import axios from "axios";
import LazyLoad from "react-lazyload";

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;

const Cloudinary = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resourceType, setResourceType] = useState("image"); // Default resource type
  const [nextCursor, setNextCursor] = useState(null); // Pagination cursor
  const [prefix, setPrefix] = useState(""); // Folder prefix

  // Function to fetch media items based on resourceType, cursor, and prefix
  const fetchCloudinaryMedia = async (
    type = "image",
    cursor = null,
    append = false,
    folderPrefix = ""
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Construct the API route URL based on resourceType
      let apiUrl = `/api/mave-cloudinary/${type}`;

      // Build query parameters
      const params = {};
      if (cursor) {
        params.next_cursor = cursor;
      }
      if (folderPrefix) {
        params.prefix = folderPrefix;
      }

      // Make a GET request to the dynamic API route with query parameters
      const response = await axios.get(apiUrl, { params });

      console.log("Cloudinary Media: ", response.data.resources);

      if (append) {
        setMediaItems((prev) => [...prev, ...response.data.resources]);
      } else {
        setMediaItems(response.data.resources);
      }

      setNextCursor(response.data.next_cursor);
    } catch (error) {
      console.error(
        "Error fetching media items: ",
        error.response?.data || error.message
      );
      setError(
        "Failed to load media items. Check if you have set up the Cloudinary environment variables correctly"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCloudinaryMedia(resourceType, null, false, prefix);
  }, [resourceType, prefix]); // Re-fetch when resourceType or prefix changes

  const loadMore = () => {
    if (nextCursor) {
      fetchCloudinaryMedia(resourceType, nextCursor, true, prefix);
    }
  };

  const onSearch = (value) => {
    setPrefix(value.trim());
    setNextCursor(null); // Reset cursor when prefix changes
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <Select
        value={resourceType}
        style={{ width: 150, marginBottom: "20px", marginRight: "20px" }}
        onChange={(value) => {
          setResourceType(value);
          setNextCursor(null); // Reset cursor when resourceType changes
        }}
      >
        <Option value="image">Images</Option>
        <Option value="video">Videos</Option>
        <Option value="raw">Raw</Option>
      </Select>

      <Search
        placeholder="Enter folder name"
        enterButton="Filter"
        onSearch={onSearch}
        style={{ width: 300, marginBottom: "20px" }}
        allowClear
      /> */}

      {/* Loading Spinner */}
      {loading && <Spin tip="Loading media items..." />}

      {/* Error Alert */}
      {error && <Alert message={error} type="error" />}

      {/* Media Items Grid */}
      <Row gutter={[16, 16]}>
        {mediaItems.map((item) => (
          <Col key={item.public_id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                resourceType === "image" ? (
                  <LazyLoad height={200} offset={100} once>
                    <Image
                      alt={item.public_id}
                      src={item.secure_url}
                      width={300}
                      height={200}
                      layout="responsive"
                      objectFit="cover"
                      loading="lazy"
                    />
                  </LazyLoad>
                ) : resourceType === "video" ? (
                  <video width="100%" controls>
                    <source
                      src={item.secure_url}
                      type={`video/${item.format}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <a
                    href={item.secure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Raw File
                  </a>
                )
              }
            >
              <Meta title={item.public_id} description={item.format} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Load More Button */}
      {nextCursor && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cloudinary;
