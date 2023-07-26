import * as React from "react";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import ReactTooltip from "react-tooltip";
import Button from "./Button";
import { getIconComp, IconName } from "@/constants/svgIcons";
import cx from "classnames";

interface IconButtonProps
  extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "color"> {
  className?: string;
  iconClassname?: string;
  iconName: IconName;
  children?: ReactNode;
  tooltip?: string;
}

const IconButton: FC<IconButtonProps> = ({
  className,
  iconName,
  children,
  iconClassname,
  tooltip,
  disabled,
  ...rest
}) => {
  const Icon = getIconComp(iconName);

  return (
    <Button
      className={cx("flex items-center justify-center gap-2 relative", className)}
      type="button"
      data-tip={tooltip}
      disabled={disabled}
      {...rest}
    >
      <Icon className={cx("h-6 w-6 text-primary-500", iconClassname)} />
      {children}
      <ReactTooltip delayShow={500} />
    </Button>
  );
};

export default IconButton;
