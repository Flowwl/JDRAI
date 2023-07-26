import { Menu } from "@headlessui/react";
import * as React from "react";
import { FC, ReactNode } from "react";
import cx from "classnames";

interface DropdownProps {
  className?: string;
  items: {
    label: string;
    onClick: () => void;
  }[];
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ className, items, children }) => {
  return (
    <Menu className={cx("flex flex-col justify-center relative", className)} as="div">
      <Menu.Button as="div">{children}</Menu.Button>
      <Menu.Items
        className={cx(
          "flex flex-col text-center",
          "bg-gray-400 text-gray-200",
          "w-full py-1 px-2",
          "border border-gray-800 rounded-sm",
          "divide-y-[0.5px] divide-1/2",
          "absolute top-9 z-dropDown",
          "translate-z-full"
        )}
      >
        {items.map((item) => (
          <Menu.Item key={item.label}>
            <span className="cursor-pointer hover:text-gray-50 hover:font-semibold py-1" onClick={item.onClick}>
              {item.label}
            </span>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
