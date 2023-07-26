import { Dialog as HDialog, Transition } from "@headlessui/react";
import * as React from "react";
import { FC, Fragment, ReactNode } from "react";
import { Size } from "@/types/size";
import cx from "classnames";

interface DialogProps {
  className?: string;
  isModalOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: ReactNode;
  size?: Size;
}

const Dialog: FC<DialogProps> = ({ className, isModalOpen, closeModal, title, children, size = "sm" }) => {
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <HDialog as="div" className={cx("relative z-modal")} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-full justify-center items-center w-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HDialog.Panel
                className={cx(
                  "transform bg-gray-600 flex flex-col rounded-sm text-left text-gray-100 align-middle shadow-3xl transition-all",
                  {
                    "w-1/3 max-h-1/4": size === "xs",
                    "w-1/2 max-h-3/5": size === "sm",
                    "w-1/3 max-h-2/3": size === "md",
                    "w-2/3 max-h-2/3": size === "lg"
                  }
                )}
              >
                {title && (
                  <HDialog.Title
                    as="div"
                    className="text-lg font-medium text-center leading-6 bg-gray-400 w-full p-2 shadow-2xl z-1 truncate"
                  >
                    {title}
                  </HDialog.Title>
                )}
                <div
                  className={cx(
                    "px-3 py-3 grow flex flex-col justify-between text-center z-auto overflow-y-auto",
                    className
                  )}
                >
                  {children}
                </div>
              </HDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HDialog>
    </Transition>
  );
};

export default Dialog;
