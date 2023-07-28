import { API_ROUTES } from "@/constants/api";
import { QueryParams, QueryResult, useQuery } from "@/hooks/useQuery";
import { ambientQueryKeys } from "@/modules/ambient/services/_ambientQueryKeys";
import { request } from "@/utils/axios";

export const useGetBackgroundImg = (keyword: string, options: QueryParams<string> = {}): QueryResult<string> => {
  return useQuery<string>({
    queryKey: [...ambientQueryKeys.getBackgroundImg, keyword],
    queryFn: () =>
      request({
        method: "GET",
        path: `${API_ROUTES.ambients}/background/${keyword}`
      }),
    ...options
  });
};
