import * as React from "react";
import { FC, ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";
import { ConfirmDialog } from "../dialogs";
import { getIconComp, IconName } from "@/constants/svgIcons";
import { useToggle } from "@/hooks/useToggle";
import cx from "classnames";

interface PanelIconRowProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  iconName?: IconName;
  selected?: boolean;
  children: ReactNode;
  deleteLabel?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

const PanelRow: FC<PanelIconRowProps> = forwardRef(function PanelRowWithRef(
  { className, children, deleteLabel, selected = false, onDelete, draggable, onEdit, iconName, ...divProps },
  ref: ForwardedRef<HTMLDivElement>
) {
  const { setFalse: closeModal, state: isModalOpen, setTrue: openModal } = useToggle(false);

  const handleDelete = async () => {
    onDelete && onDelete();
    closeModal();
  };

  const XIcon = getIconComp("X");
  const EditIcon = getIconComp("EDIT");
  const Icon = iconName ? getIconComp(iconName) : null;
  return (
    <>
      <div
        className={cx(
          "flex w-full bg-transparent px-3 py-1 cursor-pointer justify-between items-center gap-3",
          {
            "bg-primary-800 text-primary-50": selected
          },
          className
        )}
        draggable={draggable}
        ref={ref}
        {...divProps}
      >
        <div className="flex items-center laptop:w-5/6 desktop:w-3/4 gap-3 text-left cursor-pointer">
          {Icon && <Icon />}
          <div className="flex items-center w-full gap-1 desktop:gap-3 text-left">{children}</div>
        </div>
        <div className="flex items-center gap-1 justify-end laptop:w-1/6 desktop:w-1/4">
          <EditIcon
            className={cx("w-4 h-4 stroke-2 hover:opacity-50", {
              invisible: !selected
            })}
            onClick={onEdit}
          />
          <XIcon
            className={cx("text-danger-300 w-4 h-4 stroke-2 hover:text-danger-300/50", {
              invisible: !selected
            })}
            onClick={openModal}
          />
        </div>
      </div>
      <ConfirmDialog
        onConfirm={handleDelete}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        title="Delete Icon"
        dangerAction
        size="xs"
      >
        <p className="flex items-center justify-center">
          <span>{deleteLabel}</span>
        </p>
      </ConfirmDialog>
    </>
  );
});
export default PanelRow;
