import { Disclosure } from "@headlessui/react";
import * as React from "react";
import { FC, ReactNode } from "react";
import PanelRow from "./PanelRow";
import { getIconComp, IconName } from "@/constants/svgIcons";
import cx from "classnames";

interface RowDisclosureProps {
  className?: string;
  children: ReactNode;
  icon?: IconName;
  label: string;
  selected?: boolean;
}

const RowDisclosure: FC<RowDisclosureProps> = ({ className, children, label, icon, selected }) => {
  const ChevronDownIcon = getIconComp("CHEVRON_DOWN");
  const ChevronRightIcon = getIconComp("CHEVRON_RIGHT");
  return (
    <Disclosure as="div" className={cx(className)}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={cx("flex w-full justify-between", "px-2 py-1 text-left text-sm font-medium", "bg-transparent", {
              "bg-primary-800 text-primary-50": selected
            })}
          >
            <div className="flex justify-center">
              <span className="h-5 w-5 my-auto text-gray-200">{open ? <ChevronDownIcon /> : <ChevronRightIcon />}</span>
              <PanelRow iconName={icon} selected={selected}>
                {label}
              </PanelRow>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="pb-2 pl-12">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default RowDisclosure;
