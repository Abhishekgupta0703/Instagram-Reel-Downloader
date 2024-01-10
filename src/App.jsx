import React, {useState} from "react";
import Loader from "./Loader";
import axios from "axios";
import "./App.css";
import Footer from "./Footer";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getApidata = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/",
      params: {
        url: videoUrl
      },
      headers: {
        "X-RapidAPI-Key": "dc4b530d9bmsh90e50d3c38c7c70p156467jsn088bf1521ed9",
        "X-RapidAPI-Host":
          "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com"
      }
    };
    console.log("above trycatch");
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setVideoData(response.data[0].url);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownload = () => {
    if (videoData) {
      setIsLoading(true);
      const downloadLink = document.createElement("a");
      downloadLink.href = videoData;
      downloadLink.download = "downloaded_video.mp4";
      downloadLink.click();
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Instagram Video Downloader</h1>
      <form onSubmit={getApidata}>
        <input
          type="url"
          value={videoUrl}
          placeholder="Enter video url"
          onChange={(e) => setVideoUrl(e.target.value)} required
        />
        <button className="button" type="submit">
          Search Video
        </button>
      </form>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        videoData && (
          <div className="video-container">
            <video controls crossOrigin="anonymous">
              <source src={videoData} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button onClick={handleDownload}>Download Video</button>
          </div>
        )
      )}
      <Footer />
    </div>
  );
}

export default App;
