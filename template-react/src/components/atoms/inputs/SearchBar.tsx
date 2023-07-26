import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { getIconComp } from "@/constants/svgIcons";
import cx from "classnames";

interface SearchBarProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  value?: string;
}

const SearchBar: FC<SearchBarProps> = ({ className, value, ...rest }) => {
  const SearchIcon = getIconComp("SEARCH");

  return (
    <div className={cx("relative w-full py-2", className)}>
      <input
        className={cx(
          "bg-gray-700 placeholder-gray-300 text-gray-100 border-gray-500 rounded-xl w-full",
          "pl-6 laptop:pl-8"
        )}
        placeholder="Search"
        value={value}
        {...rest}
      />
      <SearchIcon
        className={cx(
          "absolute left-1 top-2.5 laptop:top-2 bottom-auto right-auto text-gray-100",
          "w-4 h-4 laptop:w-5 laptop:h-5"
        )}
      />
    </div>
  );
};

export default SearchBar;
