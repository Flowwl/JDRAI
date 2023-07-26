import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { Input } from "@/components/atoms/inputs";
import { getIconComp, IconName } from "@/constants/svgIcons";
import cx from "classnames";

interface LoginInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label: string;
  inputClassName?: string;
  icon?: IconName;
}

const LoginInput: FC<LoginInputProps> = ({ className, onChange, icon, label, value, inputClassName, ...rest }) => {
  const Icon = icon ? getIconComp(icon) : null;
  return (
    <div className={cx("flex justify-end relative items-center gap-3 w-full", className)}>
      <p
        className={cx(
          "flex items-center w-2/5 py-1.5 px-2",
          "bg-gray-600 flex items-center",
          "border-2 border-l-0 rounded-r-lg border-gray-50 shadow-cardHeader",
          "absolute -left-2 right-auto inset-y-auto",
          "overflow-hidden"
        )}
      >
        {Icon && <Icon className="h-6 w-6" />}
        <span className="text-md mobile:text-lg tablet:text-xl text-center ml-1 w-1/2">{label}</span>
      </p>
      <Input
        type="text"
        className={cx("!w-3/5 h-8 !bg-gray-800 mr-2 !text-gray-100", inputClassName)}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default LoginInput;
