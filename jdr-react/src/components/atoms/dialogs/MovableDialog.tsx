import * as React from "react";
import { FC, MouseEvent, ReactNode, useState } from "react";
import { Rnd } from "react-rnd";
import { getIconComp } from "@/constants/svgIcons";
import { useDiagramMovableWindowsContext } from "@/contexts/MovableWindowsContext";
import { useGetWindowsSize } from "@/hooks/useGetWindowsSize";
import cx from "classnames";

interface MovableDialogProps {
  windowId: string;
  children: ReactNode;
  title?: string;
  onClose?: () => void;
}

const MovableDialog: FC<MovableDialogProps> = ({ windowId, onClose, children, title }) => {
  const { windowHeight, windowWidth } = useGetWindowsSize();
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: windowWidth / 3, y: windowHeight / 5 });

  const { closeMovableWindow } = useDiagramMovableWindowsContext();

  const handleOnClose = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onClose && onClose();
    closeMovableWindow(windowId);
  };

  const XIcon = getIconComp("X");
  return (
    <Rnd
      className="z-modal bg-gray-800 text-gray-50 relative"
      default={{ height: "auto", width: (windowWidth * 3) / 7, y: position.y, x: position.x }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      dragHandleClassName={"rnd-header"}
      bounds=".App"
    >
      <div className={cx("bg-gray-600 flex flex-col text-left text-gray-100 align-middle w-full h-full")}>
        {title && (
          <div className="bg-gray-400 w-full p-2 shadow-2xl z-1 relative rnd-header cursor-move">
            <p className="text-lg font-medium text-center leading-6 truncate">{title}</p>
            <XIcon
              className={cx(
                "text-danger-300 w-5 h-5 stroke-4 cursor-pointer absolute right-2 bottom-auto top-2 left-auto hover:opacity-50"
              )}
              onClick={handleOnClose}
            />
          </div>
        )}
        <div
          className={cx("mt-2 px-3 pt-2 pb-5 flex flex-col text-center z-auto overflow-y-auto")}
          style={{ maxHeight: (windowHeight * 3) / 5 }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default MovableDialog;
