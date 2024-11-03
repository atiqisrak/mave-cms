// pages/generate-image/index.jsx
import { useState } from "react";

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      alert("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  const modifyImage = () => {
    // Implement image modification logic here
    alert("Modify Image feature is under construction.");
  };

  return (
    <div className="mavecontainer">
      <h1>Image Generator</h1>
      <textarea
        rows="4"
        cols="50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
      />
      <br />
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imageUrl && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "100%" }} />
          <br />
          <button onClick={modifyImage}>Modify Image</button>
        </div>
      )}
    </div>
  );
}
