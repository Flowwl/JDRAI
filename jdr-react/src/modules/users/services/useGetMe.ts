import { User } from "../types";
import { userQueryKeys } from "./_userQueryKeys";
import { API_ROUTES } from "@/constants/api";
import { QueryParams, QueryResult, useQuery } from "@/hooks/useQuery";
import { request } from "@/utils/axios";

export const useGetMe = (options: QueryParams<User> = {}): QueryResult<User> => {
  return useQuery({
    queryKey: userQueryKeys.getMe,
    queryFn: () =>
      request({
        method: "GET",
        path: `${API_ROUTES.users}/me`
      }),
    ...options
  });
};
