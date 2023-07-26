import * as React from "react";
import { FC, Fragment, ReactNode, useState } from "react";
import { createCtx } from "@/utils";
import cx from "classnames";

interface Props {
  children: ReactNode;
}

type MovableWindow = {
  id: string;
  window: ReactNode;
};

const DiagramMovableWindowsContextProvider: FC<Props> = ({ children }) => {
  const [activateMovableWindows, setActivateMovableWindows] = useState<MovableWindow[]>([]);

  const openMovableWindow = (movableWindow: MovableWindow) => {
    if (isMovableWindowOpen(movableWindow.id)) {
      return;
    }
    setActivateMovableWindows((prevState) => [...prevState, movableWindow]);
  };

  const isMovableWindowOpen = (movableWindowId: string) => {
    return !!activateMovableWindows.find((movableWindow) => movableWindow.id === movableWindowId);
  };

  const closeMovableWindow = (movableWindowId: string) => {
    setActivateMovableWindows((prevState) => prevState.filter((movableWindow) => movableWindow.id !== movableWindowId));
  };

  const closeAllMovableWindows = () => {
    setActivateMovableWindows([]);
  };

  return (
    <DiagramMovableWindowsContextBaseProvider
      value={{
        openMovableWindow,
        isMovableWindowOpen,
        closeMovableWindow,
        closeAllMovableWindows
      }}
    >
      <div className="relative w-full h-full">
        <div className={cx("h-full")}>{children}</div>
        <div className="absolute z-modal h-1 w-1 inset-0 toto">
          {activateMovableWindows.map(({ id, window: Window }) => (
            <Fragment key={id}>{Window}</Fragment>
          ))}
        </div>
      </div>
    </DiagramMovableWindowsContextBaseProvider>
  );
};

export default DiagramMovableWindowsContextProvider;

export interface MovableWindowsContext {
  openMovableWindow: (movableWindow: MovableWindow) => void;
  isMovableWindowOpen: (movableWindowId: string) => boolean;
  closeMovableWindow: (movableWindowId: string) => void;
  closeAllMovableWindows: () => void;
}

export const [useDiagramMovableWindowsContext, DiagramMovableWindowsContextBaseProvider] =
  createCtx<MovableWindowsContext>();
