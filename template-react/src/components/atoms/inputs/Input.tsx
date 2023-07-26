import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import cx from "classnames";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
}

const Input: FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={cx("bg-gray-700 px-2 pt-1 py-1 rounded-sm outline-none text-gray-100 w-full rounded-md", className)}
      {...rest}
    />
  );
};

export default Input;
