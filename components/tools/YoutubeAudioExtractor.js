// https://github.dev/hanifsheikh/grabtube/blob/main/pages/api/youtube/download.ts

import { Button, Input, Select, Spin, message } from "antd";
import React, { useState, useEffect } from "react";
// import instance from "../../axios";
// import youtubeDl from "youtube-dl-exec";

const YoutubeAudioExtractor = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [loading, setLoading] = useState(false);
  const [audioExtracted, setAudioExtracted] = useState(false);

  const NEXT_PUBLIC_YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  //   const extractAudio = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await instance.get(
  //         `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeUrl}&key=${NEXT_PUBLIC_YOUTUBE_API_KEY}`
  //       );

  //       if (response.data.items.length === 0) {
  //         const videoDetails = response.data.items[0].snippet;
  //         console.log("Video Details:", videoDetails);

  //         // Extract audio using youtube-dl
  //         const audioInfo = await youtubeDl.raw(youtubeUrl, {
  //           extractAudio: true,
  //           audioFormat: audioFormat,
  //         });
  //         setAudioExtracted(true);
  //         message.success("Audio extracted successfully");
  //         console.log("Audio Info:", audioInfo);
  //         setLoading(false);
  //       } else {
  //         message.error("Invalid Youtube URL");
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setLoading(false);
  //     }
  //   };

  //   const handleDownload = async () => {
  //     try {
  //       const audioInfo = await youtubeDl.raw(youtubeUrl, {
  //         extractAudio: true,
  //         audioFormat: audioFormat,
  //       });
  //       console.log("Audio Info:", audioInfo);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  return (
    <div>
      <h1>Youtube Audio Extractor</h1>

      <div className="audio-extractor-container">
        <div className="audio-extractor-input">
          <Input
            placeholder="Enter Youtube URL"
            style={{
              width: "100%",
              margin: "1rem 0",
            }}
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />

          <Button
            type="primary"
            style={{
              width: "100%",
              margin: "1rem 0",
            }}
            // onClick={extractAudio}
          >
            Extract Audio
          </Button>
        </div>

        {loading && (
          <div className="loader">
            Loading ... <Spin />
          </div>
        )}

        {audioExtracted && (
          <div className="audio-extractor-output">
            <Select
              placeholder="Select audio format"
              style={{
                width: "100%",
                margin: "1rem 0",
              }}
              value={audioFormat}
              onChange={(value) => setAudioFormat(value)}
              showSearch
            >
              <Select.Option value="mp3">MP3</Select.Option>
              <Select.Option value="wav">WAV</Select.Option>
              <Select.Option value="flac">FLAC</Select.Option>
              <Select.Option value="m4a">M4A</Select.Option>
              <Select.Option value="ogg">OGG</Select.Option>
              <Select.Option value="wma">WMA</Select.Option>
            </Select>
            <Button
              type="primary"
              style={{
                width: "100%",
                margin: "1rem 0",
              }}
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YoutubeAudioExtractor;
