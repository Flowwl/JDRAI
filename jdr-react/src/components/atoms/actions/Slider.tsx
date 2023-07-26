import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import "./Slider.scss";
import cx from "classnames";

interface SliderProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  withLabel?: boolean;
}

const Slider: FC<SliderProps> = ({ className, value, withLabel = false, ...rest }) => {
  return (
    <div className="flex justify-center items-center relative">
      <input
        className={cx("w-full h-3 bg-gray-400 rounded-md outline-0 appearance-none", className)}
        type="range"
        {...rest}
      />
      {withLabel && <p className="absolute inset-y-0 bottom-auto top-4">{value}</p>}
    </div>
  );
};

export default Slider;
