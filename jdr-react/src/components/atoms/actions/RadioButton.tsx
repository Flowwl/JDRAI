import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import cx from "classnames";

interface RadioProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label?: string;
}

const RadioButton: FC<RadioProps> = ({ className, checked, label, ...rest }) => {
  return (
    <div className="flex gap-3">
      {label && label}
      <input type="radio" className={cx(className)} checked={checked} {...rest} />
    </div>
  );
};

export default RadioButton;
