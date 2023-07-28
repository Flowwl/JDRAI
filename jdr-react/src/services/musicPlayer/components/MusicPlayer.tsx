import * as React from "react";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface MusicPlayerProps {
  keyword?: string;
}

const MusicPlayer: FC<MusicPlayerProps> = ({ keyword = "JDR Ambient music" }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fetchVideo() {
      const video = await youtubesearchapi.GetListByKeyword(keyword, false, 1);
      if (!video || video.videos.length === 0) {
        return;
      }

      setUrl(`${YOUTUBE_URL}/watch?v=${video.videos[0].id}`);
    }

    fetchVideo();
  }, []);

  return <ReactPlayer playing url={url} />;
};

export default MusicPlayer;
