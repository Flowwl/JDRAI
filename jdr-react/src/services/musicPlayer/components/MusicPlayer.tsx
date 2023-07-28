import * as React from "react";
import { FC, useState } from "react";
import ReactPlayer from "react-player";
import { useGetMusicUrl } from "@/modules/ambient";

interface MusicPlayerProps {
  keyword?: string;
}

const MusicPlayer: FC<MusicPlayerProps> = ({ keyword = "JDR Ambient music" }) => {
  const [isMuted, setIsMuted] = useState(true);
  const { data: url } = useGetMusicUrl(keyword);

  if (!url) {
    return null;
  }
  return (
    <div>
      <ReactPlayer playing width={0} height={0} url={url} volume={50} muted={isMuted} loop />
      <button onClick={() => setIsMuted((prevState) => !prevState)}>{isMuted ? "Unmute" : "Mute"}</button>
    </div>
  );
};

export default MusicPlayer;
