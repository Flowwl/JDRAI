import * as React from "react";
import { FC } from "react";
import Logo from "@/components/atoms/Logo";
import LoginForm from "@/views/login/LoginForm";
import cx from "classnames";

interface LoginViewProps {
  className?: string;
}

const LoginView: FC<LoginViewProps> = ({ className }) => {
  return (
    <div className={cx("bg-gray-600 h-full text-gray-0 flex flex-col gap-3 items-center justify-center", className)}>
      <div className="flex flex-col tablet:flex-row w-full justify-center items-center gap-3">
        <Logo />
        <h1 className="font-roboto text-4xl tablet:text-5xl text-center">Login View</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginView;
