import * as React from "react";
import { FC, ReactNode } from "react";
import { Button } from "../actions";
import Dialog from "./Dialog";
import { Size } from "@/types/size";
import cx from "classnames";

interface ConfirmDialogProps {
  className?: string;
  onConfirm: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  children: ReactNode;
  title?: string;
  dangerAction?: boolean;
  size?: Size;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  className,
  onConfirm,
  isModalOpen,
  closeModal,
  children,
  dangerAction = false,
  title,
  size = "xs"
}) => {
  return (
    <Dialog
      className={cx("flex flex-col gap-3", className)}
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      title={title}
      size={size}
    >
      {children}
      <div className="flex justify-evenly">
        <Button onClick={() => closeModal()} color="secondary">
          Cancel
        </Button>
        <Button color={dangerAction ? "danger" : "primary"} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
