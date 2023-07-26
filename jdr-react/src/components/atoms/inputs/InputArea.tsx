import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import cx from "classnames";

interface InputProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  className?: string;
}

const InputArea: FC<InputProps> = ({ className, ...rest }) => {
  return (
    <textarea
      className={cx(
        "bg-gray-700 px-2 pt-1 py-1 rounded-sm outline-none text-gray-100 w-full rounded-md resize-none",
        className
      )}
      onScroll={(e) => {
        e.stopPropagation();
      }}
      {...rest}
    />
  );
};

export default InputArea;
