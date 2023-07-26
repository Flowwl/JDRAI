import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import "./Incrementer.scss";
import { getIconComp } from "@/constants/svgIcons";
import cx from "classnames";

interface IncrementerProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"> {
  className?: string;
  value: number;
  onChange: (value: number) => void;
}

const Incrementer: FC<IncrementerProps> = ({ className, value, onChange, ...rest }) => {
  const ArrowDownIcon = getIconComp("CHEVRON_DOWN");
  const ArrowUpIcon = getIconComp("CHEVRON_UP");

  return (
    <div className="text-center relative">
      <input
        type="number"
        value={value}
        min={0}
        className={cx("relative w-full h-7 rounded-md bg-gray-500 text-gray-50 appearance-none text-center", className)}
        readOnly
        {...rest}
      />
      <ArrowUpIcon
        className="h-3 w-3 hover:text-white cursor-pointer absolute top-0 bottom-auto left-auto right-1 stroke-4"
        onClick={() => {
          onChange(value + 1);
        }}
      />
      <ArrowDownIcon
        className="h-3 w-3 hover:text-white cursor-pointer absolute top-auto bottom-0 left-auto right-1 stroke-4"
        onClick={() => onChange(Math.max(value - 1, 0))}
      />
    </div>
  );
};

export default Incrementer;
