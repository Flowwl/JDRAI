import * as React from "react";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, MouseEvent } from "react";
import { Size } from "@/types/size";
import cx from "classnames";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  color?: "primary" | "secondary" | "danger";
  size?: Size;
}

const Button: FC<ButtonProps> = ({ className, color = "primary", size = "md", disabled, onClick, ...rest }) => {
  const onClickHandle = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  };
  return (
    <button
      className={cx(
        {
          "bg-gray-300 hover:opacity-70 text-white": color === "primary",
          "bg-gray-500 hover:bg-gray-800 hover:text-gray-50 text-gray-100": color === "secondary",
          "bg-danger-300 hover:bg-danger-500 text-white": color === "danger",
          "opacity-40 hover:opacity-40": !!disabled
        },
        {
          "px-4 py-2": size === "md",
          "px-1.5 py-0.5 text-xs": size === "sm"
        },
        "border border-gray-600 rounded-sm",
        className
      )}
      type="button"
      onClick={onClickHandle}
      {...rest}
    />
  );
};

export default Button;
