import * as React from "react";
import { FC } from "react";
import { Checkbox } from "../atoms/actions";
import cx from "classnames";

export type SelectItem = {
  checked: boolean;
  label: string;
};

interface SelectListProps {
  className?: string;
  items: SelectItem[];
  onItemChecked: (label: string, checked: boolean) => void;
}

const SelectList: FC<SelectListProps> = ({ className, items, onItemChecked }) => {
  return (
    <div className={cx("flex flex-col bg-gray-400 py-2 rounded-md overflow-y-auto", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-row gap-4 px-3 items-center">
          <Checkbox
            checked={item.checked}
            onChange={(e) => onItemChecked(item.label, e.target.checked)}
            className="h-4 w-4"
          />
          <p className="">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectList;
