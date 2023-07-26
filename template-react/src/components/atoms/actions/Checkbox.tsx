import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import cx from "classnames";

interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({ className, checked, ...rest }) => {
  return <input type="checkbox" className={cx(className)} checked={checked} {...rest} />;
};

export default Checkbox;
