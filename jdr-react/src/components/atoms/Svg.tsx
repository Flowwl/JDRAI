import * as React from "react";
import { FC, HTMLAttributes } from "react";
// @ts-expect-error
import InlineSVG from "svg-inline-react";
import "@/styles/svg.scss";
import { Size } from "@/types/size";
import { getSizeByScale, Scale } from "@/utils/sizes";
import cx from "classnames";

interface SvgProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: Size;
  src: string | ArrayBuffer;
  onClick?: () => void;
  scale?: Scale;
}

const Svg: FC<SvgProps> = ({ className, src, scale, size = "xs", onClick, ...rest }) => {
  const sizes = {
    "w-2 h-2": size === "xs",
    "w-4 h-4": size === "sm",
    "w-12 h-12": size === "md",
    "w-24 h-24": size === "lg"
  };
  return (
    <div onClick={onClick} className={cx(scale ? getSizeByScale(size, scale) : sizes, className)} {...rest}>
      <InlineSVG
        src={src}
        className={cx("svg text-gray-200", {
          "hover:text-gray-50 cursor-pointer ": !!onClick
        })}
      />
    </div>
  );
};

export default Svg;
