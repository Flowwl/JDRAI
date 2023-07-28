import * as React from "react";
import { FC } from "react";
import { useGetBackgroundImg } from "@/modules/ambient";

interface AmbientBackgroundImgProps {
  className?: string;
  keyword?: string;
}

const AmbientBackgroundImg: FC<AmbientBackgroundImgProps> = ({
  className,
  keyword = "Magical Forest in Cartoon medieval fantasy"
}) => {
  const { data: url } = useGetBackgroundImg(keyword);

  if (!url) {
    return null;
  }

  return <img className={className} src={url} />;
};

export default AmbientBackgroundImg;
