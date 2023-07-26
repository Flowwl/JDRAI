import { API_ROUTES } from "@/constants/api";
import { MutationParams, MutationResult, useMutation } from "@/hooks/useQuery";
import { characterQueryKeys } from "@/modules/characters/services/_charactersQueryKeys";
import { request } from "@/utils/axios";

export const useGenerateCharacters = (options?: MutationParams<string, void>): MutationResult<string, void> => {
  return useMutation({
    mutationKey: characterQueryKeys.generate,
    mutationFn: async (prompt: string) =>
      request({
        method: "POST",
        path: `${API_ROUTES.characters}/generate`,
        body: { prompt }
      }),
    ...options
  });
};
