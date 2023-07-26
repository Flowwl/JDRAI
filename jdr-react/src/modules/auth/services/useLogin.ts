import { authQueryKeys } from "./_authQueryKeys";
import { API_ROUTES } from "@/constants/api";
import { MutationParams, MutationResult, useMutation } from "@/hooks/useQuery";
import { Login } from "@/modules/auth/types";
import { User } from "@/modules/users/types";
import { request } from "@/utils/axios";

export const useLogin = (options?: MutationParams<Login>): MutationResult<Login> => {
  return useMutation({
    mutationKey: authQueryKeys.LOGIN,
    mutationFn: async (credentials: Login) =>
      request<User>({
        method: "POST",
        path: `${API_ROUTES.auth}/login`,
        body: credentials
      }),
    ...options
  });
};
