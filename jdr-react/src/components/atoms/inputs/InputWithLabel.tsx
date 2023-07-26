import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import Input from "./Input";
import cx from "classnames";

interface InputWithLabelProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label?: string;
  inputClassName?: string;
}

const InputWithLabel: FC<InputWithLabelProps> = ({ className, onChange, label, value, inputClassName, ...rest }) => {
  return (
    <div className={cx("flex flex-col justify-between items-center gap-3 mt-3", className)}>
      {label && <span className="font-semibold text-medium text-center ml-1 w-1/2 ">{label}</span>}
      <Input type="text" className={cx("w-1/2", inputClassName)} onChange={onChange} value={value} {...rest} />
    </div>
  );
};

export default InputWithLabel;
