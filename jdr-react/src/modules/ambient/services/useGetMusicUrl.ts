import { API_ROUTES } from "@/constants/api";
import { QueryParams, QueryResult, useQuery } from "@/hooks/useQuery";
import { ambientQueryKeys } from "@/modules/ambient/services/_ambientQueryKeys";
import { request } from "@/utils/axios";

export const useGetMusicUrl = (keyword: string, options: QueryParams<string> = {}): QueryResult<string> => {
  return useQuery<string>({
    queryKey: [...ambientQueryKeys.getMusicUrl, keyword],
    queryFn: () =>
      request({
        method: "GET",
        path: `${API_ROUTES.ambients}/music/${keyword}`
      }),
    ...options
  });
};
