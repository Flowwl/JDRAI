import * as React from "react";
import { FC, ReactNode } from "react";
import { getIconComp, IconName } from "@/constants/svgIcons";
import cx from "classnames";

interface PanelTabProps {
  className?: string;
  icon?: IconName;
  label: string;
  children: ReactNode;
}

const PanelTab: FC<PanelTabProps> = ({ className, icon, label, children }) => {
  const Icon = icon ? getIconComp(icon) : null;
  return (
    <div className={cx("h-full flex flex-col", className)}>
      <div className="flex items-center w-3/5 rounded-t-md bg-gray-400 text-gray-200 py-1 px-2 gap-2">
        {Icon && <Icon className={cx("h-4 w-4 text-gray-200")} />}
        <span className="text-gray-50 ">{label}</span>
      </div>
      <div className="bg-gray-800 w-full h-full flex flex-col">{children}</div>
    </div>
  );
};

export default PanelTab;
