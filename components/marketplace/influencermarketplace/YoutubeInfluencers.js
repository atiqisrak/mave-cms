import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, List } from "antd";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";

export default function YoutubeInfluencers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [influencerData, setInfluencerData] = useState([]);
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const fetchChannels = async (query) => {
    try {
      const searchResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${query}&type=channel&part=snippet&maxResults=10`
      );

      const channelIds = searchResponse.data.items
        .map((item) => item.id.channelId)
        .join(",");

      const channelResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${channelIds}&part=snippet,statistics`
      );

      if (channelResponse.data.items) {
        setInfluencerData(channelResponse.data.items);
      } else {
        console.error("Error fetching data from YouTube API: No items found");
      }
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchChannels(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <div>
      <Input.Search
        prefix={<SearchOutlined />}
        placeholder="Search YouTube Channels by topic"
        style={{
          width: "80%",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "25px",
        }}
        enterButton="Search"
        onSearch={handleSearch}
      />
      {influencerData.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={influencerData}
          renderItem={(channel) => (
            <List.Item
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <List.Item.Meta
                title={channel.snippet.title}
                description={channel.snippet.description}
                avatar={
                  <Image
                    src={channel.snippet.thumbnails.default.url}
                    alt={channel.snippet.title}
                    width={100}
                    height={100}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                }
              />
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <p>Subscribers: {channel.statistics.subscriberCount}</p>
                <p>Views: {channel.statistics.viewCount}</p>
                <Button
                  type="primary"
                  onClick={() =>
                    (window.location.href = `mailto:?subject=Contact YouTube Channel ${channel.snippet.title}&body=I would like to contact you regarding your YouTube channel.`)
                  }
                >
                  Contact
                </Button>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <p>No data available. Please search for a topic.</p>
      )}
    </div>
  );
}
