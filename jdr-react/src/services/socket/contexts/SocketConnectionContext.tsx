import React, { FC, ReactNode, useEffect, useState } from "react";
import ConnectionManager from "../components/ConnectionManager";
import { socket } from "../socket";
import { createCtx } from "@/utils";
import cx from "classnames";

interface Props {
  children: ReactNode;
}

const SocketConnectionProvider: FC<Props> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("userConnected");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketConnectionBaseProvider
      value={{
        isConnected
      }}
    >
      <div className={cx("h-full")}>{children}</div>
      <ConnectionManager />
    </SocketConnectionBaseProvider>
  );
};

export default SocketConnectionProvider;

export interface SocketConnection {
  isConnected: boolean;
}

export const [useSocketConnection, SocketConnectionBaseProvider] = createCtx<SocketConnection>();
