import * as React from "react";
import { FC, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/actions";
import { ROUTES } from "@/components/routes/constants/routes";
import { useLogin } from "@/modules/auth/services/useLogin";
import { Login } from "@/modules/auth/types";
import { userQueryKeys } from "@/modules/users/services/_userQueryKeys";
import LoginInput from "@/views/login/LoginInput";
import cx from "classnames";

interface LoginFormProps {
  className?: string;
}

const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const [credentials, setCredentials] = useState<Login>({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login } = useLogin({
    onSuccess: async () => {
      await queryClient.invalidateQueries(userQueryKeys.getMe);

      navigate(ROUTES.HOME.path);
    },
    onError: () => {
      toast.error("The credentials are incorrect");
    }
  });
  return (
    <form
      className={cx(
        "border border-gray-50 rounded-lg shadow-card",
        "w-4/5 tablet:w-1/2 laptop:1/3 desktop:w-1/4",
        "flex flex-col gap-6 pt-8 pb-4",
        className
      )}
    >
      <LoginInput
        icon="USERNAME"
        label="Username"
        value={credentials.email}
        onChange={(e) => {
          setCredentials((prevState) => ({ ...prevState, email: e.target.value }));
        }}
      />
      <LoginInput
        icon="PASSWORD"
        label="Password"
        value={credentials.password}
        type="password"
        onChange={(e) => {
          setCredentials((prevState) => ({ ...prevState, password: e.target.value }));
        }}
      />
      <Button className="mx-auto text-lg w-1/3" type="button" onClick={() => login(credentials)}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
