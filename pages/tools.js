import React, { useState, useEffect } from "react";
import ToolsMarketplace from "../components/tools/ToolsMarketplace";
import { Radio } from "antd";
import InfluencerTemplate from "../components/tools/InfluencerTemplate";
import YoutubeAudioExtractor from "../components/tools/YoutubeAudioExtractor";
// import ImageOptimizer from "../components/tools/ImageOptimizer";

const Tools = () => {
  const [platinumUser, setPlatinumUser] = useState(false);

  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        <h1>Tools</h1>
        <center>
          <Radio.Group
            onChange={(e) => setPlatinumUser(e.target.value)}
            value={platinumUser}
            style={{
              margin: "2rem 0",
            }}
          >
            <Radio value={false}>Free</Radio>
            <Radio value={true}>Premium</Radio>
          </Radio.Group>
        </center>
        {
          // platinumUser ? <ToolsMarketplace /> : <center><h1>Coming soon...</h1></center>
          platinumUser ? (
            <center>
              <h1>Coming soon...</h1>
            </center>
          ) : (
            <center>
              <h1>Coming soon...</h1>
            </center>
          )
        }
        {/* <YoutubeAudioExtractor /> */}
      </div>
    </div>
  );
};

export default Tools;
