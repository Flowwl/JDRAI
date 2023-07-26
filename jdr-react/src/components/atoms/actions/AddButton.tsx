import * as React from "react";
import { FC, HTMLAttributes } from "react";
import { getIconComp } from "@/constants/svgIcons";
import { Size } from "@/types/size";
import cx from "classnames";

interface AddButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: Size;
}

const AddButton: FC<AddButtonProps> = ({ className, size = "sm", ...rest }) => {
  const PlusIcon = getIconComp("PLUS");
  return (
    <button
      className={cx(
        "flex items-center",
        "px-2 gap-1",
        "bg-gray-300 border-gray-600 border hover:opacity-70",
        "rounded-sm",
        className
      )}
      {...rest}
    >
      <PlusIcon
        className={cx("text-success-300", {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md"
        })}
      />
      <span className="text-gray-100">Add</span>
    </button>
  );
};

export default AddButton;
