import * as React from "react";
import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, useState } from "react";
import "./ColorPicker.scss";
import { isHexColor } from "@/utils/colors";
import cx from "classnames";

interface ColorPickerProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ value, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(value);
  const [colorValue, setColorValue] = useState(value);
  const [isError, setIsError] = useState(false);

  const onInputColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isHexColor(e.target.value)) {
      setIsError(true);
    } else {
      setIsError(false);
      onChange(e);
    }
  };

  const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColorValue(e.target.value);
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <div
      className={cx("flex items-center gap-2 border rounded-lg pr-2", {
        "border-danger-300": isError,
        "border-gray-50": !isError
      })}
    >
      <input
        type="color"
        value={colorValue}
        onChange={onColorChange}
        className={cx({
          "text-danger-300": isError,
          "text-gray-50": !isError
        })}
        {...props}
      />
      <input
        value={inputValue}
        onChange={onInputColorChange}
        type="text"
        className={cx("bg-transparent focus:outline-none w-16 text-center")}
      />
    </div>
  );
};

export default ColorPicker;
