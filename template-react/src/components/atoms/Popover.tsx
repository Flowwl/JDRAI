import * as React from "react";
import { FC } from "react";
import cx from "classnames";

interface PopoverProps {
  className?: string;
  children: React.ReactNode;
}

const Popover: FC<PopoverProps> = ({ className, children }) => {
  return (
    <div
      className={cx(
        "bg-gray-600/70 rounded-b-lg text-gray-50",
        "border-gray-600 border",
        "flex flex-col absolute ",
        "gap-3 px-2 py-2",
        "top-10 right-auto left-auto bottom-auto",
        "rounded-md z-popover",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Popover;
