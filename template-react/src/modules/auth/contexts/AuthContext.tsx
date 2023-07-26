import * as React from "react";
import { FC, ReactNode } from "react";
import { useGetMe } from "@/modules/users/services/useGetMe";
import { User } from "@/modules/users/types";
import { createCtx } from "@/utils";

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = (props) => {
  const { children } = props;
  const { isLoading, data: me = null } = useGetMe({
    cacheTime: Infinity
  });

  return (
    <AuthContextProvider
      value={{
        me,
        isLoading,
        isConnected: Boolean(me)
      }}
    >
      {children}
    </AuthContextProvider>
  );
};
export default AuthProvider;

export interface AuthContextType {
  isLoading: boolean;
  isConnected: boolean;
  me: User | null;
}

export const [useAuthContext, AuthContextProvider] = createCtx<AuthContextType>();
