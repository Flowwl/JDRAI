import * as React from "react";
import { FC, ReactNode } from "react";
import { AddButton } from "../atoms/actions";
import { SearchBar } from "../atoms/inputs";
import cx from "classnames";

interface LeftPanelTabHeaderProps {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  children: ReactNode;
  onAdd?: () => void;
  onSearch?: (value: string) => void;
}

const PanelTabHeader: FC<LeftPanelTabHeaderProps> = ({
  className,
  headerClassName,
  bodyClassName,
  children,
  onAdd,
  onSearch
}) => {
  return (
    <div className={cx("h-full flex flex-col", className)}>
      <div
        className={cx("flex items-center px-2 py-1 gap-1 laptop:gap-4 bg-gray-400 justify-between", headerClassName)}
      >
        {onSearch && <SearchBar className="w-4/5" onChange={(e) => onSearch(e.target.value)} />}
        {onAdd && <AddButton onClick={onAdd} />}
        {!onAdd && !onSearch && <div className="h-4 w-2" />}
      </div>
      <div
        className={cx(
          "bg-gray-600 text-gray-200",
          "pt-1 pb-3 px-1 flex flex-col h-full",
          "overflow-y-auto",
          bodyClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default PanelTabHeader;
