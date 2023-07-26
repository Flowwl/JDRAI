import { API_ROUTES } from "@/constants/api";
import { MutationParams, MutationResult, useMutation } from "@/hooks/useQuery";
import { authQueryKeys } from "@/modules/auth/services/_authQueryKeys";
import { request } from "@/utils/axios";

export const useLogout = (options?: MutationParams<void>): MutationResult<void> => {
  return useMutation({
    mutationKey: authQueryKeys.LOGOUT,
    mutationFn: () =>
      request({
        method: "GET",
        path: `${API_ROUTES.auth}/logout`
      }),
    retry: false,
    ...options
  });
};
