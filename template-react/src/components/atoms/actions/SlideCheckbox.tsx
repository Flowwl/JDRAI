import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { Size } from "@/types/size";
import cx from "classnames";

interface CheckboxProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size"> {
  className?: string;
  onChecked: (isChecked: boolean, id?: string) => void;
  size?: Size;
  isSwitch?: boolean;
}

const SlideCheckbox: FC<CheckboxProps> = ({
  className,
  onChecked,
  size = "md",
  isSwitch = false,
  checked,
  id,
  ...rest
}) => {
  const onCheckedHandle = () => {
    onChecked(!checked, id);
  };

  const beforeContent = isSwitch ? "before:content-['TRUE'] before:text-xxs" : "before:content-['ON'] before:text-xs";
  const afterContent = isSwitch ? "after:content-['FALSE'] after:text-xxs" : "after:content-['OFF'] after:text-xs";
  return (
    <div
      className={cx(
        " bg-gray-500 relative rounded-xl shadow-slideCheckbox font-semibold flex items-center justify-center",
        `${beforeContent} before:text-success-600 before:absolute before:left-2 before:inset-y-auto my-auto`,
        `${afterContent} after:text-danger-300 after:absolute after:right-2 after:inset-y-auto`,
        {
          "w-20 h-6": size === "md",
          "w-14 h-4 after:text-xxs before:text-xxs after:right-1 before:left-1": size === "sm"
        },
        className
      )}
    >
      <input type="checkbox" className="hidden" checked={checked} {...rest} readOnly />
      <label
        onClick={onCheckedHandle}
        className={cx("block cursor-pointer absolute z-1 bg-gray-50 rounded-xl", {
          "left-auto right-1": checked && size === "md",
          "left-1 right-auto": !checked && size === "md",
          "w-9 h-5": size === "md",
          "left-auto right-0": checked && size === "sm",
          "left-0 right-auto": !checked && size === "sm",
          "w-7 h-4": size === "sm"
        })}
      />
    </div>
  );
};

export default SlideCheckbox;
