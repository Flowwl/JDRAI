import { API_ROUTES } from "@/constants/api";
import { MutationParams, MutationResult, useMutation } from "@/hooks/useQuery";
import { characterQueryKeys } from "@/modules/characters/services/_charactersQueryKeys";
import { Character } from "@/modules/characters/types";
import { request } from "@/utils/axios";

export const useGenerateCharacters = (
  options?: MutationParams<void, Character[]>
): MutationResult<void, Character[]> => {
  return useMutation({
    mutationKey: characterQueryKeys.generate,
    mutationFn: async () =>
      request({
        method: "POST",
        path: `${API_ROUTES.characters}/generate`,
        body: { prompt }
      }),
    ...options
  });
};
