import * as React from "react";
import { getIconComp, IconName } from "@/constants/svgIcons";
import cx from "classnames";

interface IconHeaderButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: IconName;
  label: string;
}

const IconHeaderButton: React.FC<IconHeaderButtonProps> = ({ className, icon, label, ...rest }) => {
  const Icon = icon ? getIconComp(icon) : null;
  return (
    <button
      className={cx(
        "flex gap-2 items-center",
        "py-1 px-2 rounded-sm my-auto",
        "bg-transparent text-gray-200 hover:text-gray-0", //hover:bg-primary-500 hover:text-white",
        className
      )}
      {...rest}
    >
      {Icon && <Icon className={cx("h-5 w-5")} />}
      <span className="">{label}</span>
    </button>
  );
};

export default IconHeaderButton;
