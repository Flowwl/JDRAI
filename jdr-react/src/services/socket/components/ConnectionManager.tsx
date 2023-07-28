import * as React from "react";
import { FC } from "react";
import { socket } from "@/services";

interface ConnectionManagerProps {
  className?: string;
}

const ConnectionManager: FC<ConnectionManagerProps> = ({ className }) => {
  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return (
    <div className={className}>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
};

export default ConnectionManager;
