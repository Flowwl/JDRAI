import { Disclosure } from "@headlessui/react";
import * as React from "react";
import { FC, ReactNode } from "react";
import { getIconComp } from "@/constants/svgIcons";
import cx from "classnames";

interface HeaderDisclosureProps {
  className?: string;
  children: ReactNode;
  label: string;
}

const HeaderDisclosure: FC<HeaderDisclosureProps> = ({ className, children, label }) => {
  const ChevronDownIcon = getIconComp("CHEVRON_DOWN");
  const ChevronRightIcon = getIconComp("CHEVRON_RIGHT");
  return (
    <Disclosure as="div" className={className}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={cx("flex w-full justify-between", "px-2 py-2 text-left text-sm font-medium", "bg-gray-400")}
          >
            <p className="flex justify-center">
              <span className="h-5 w-5 my-auto text-gray-200">{open ? <ChevronDownIcon /> : <ChevronRightIcon />}</span>
              <span className="text-gray-200 uppercase">{label}</span>
            </p>
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default HeaderDisclosure;
