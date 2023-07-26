import * as React from "react";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "@/components/atoms/Spinner";
import { ROUTES } from "@/components/routes/constants/routes";
import { useAuthContext } from "@/modules/auth";

const PrivateElement: FC<{ element: JSX.Element }> = ({ element }) => {
  const { isConnected, isLoading } = useAuthContext();
  if (isLoading) {
    return <Spinner />;
  }
  if (!isConnected) {
    return <Navigate to={ROUTES.LOGIN.path} />;
  }
  return element;
};

export default PrivateElement;
