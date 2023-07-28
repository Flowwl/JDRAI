import { Story } from "../types";
import { storiesQueryKeys } from "./_storiesQueryKeys";
import { API_ROUTES } from "@/constants/api";
import { MutationParams, MutationResult, useMutation } from "@/hooks/useQuery";
import { getSelectedCharacter } from "@/modules/characters";
import { request } from "@/utils/axios";

export const useGenerateStories = (options?: MutationParams<void, Story>): MutationResult<void, Story> => {
  return useMutation({
    mutationKey: storiesQueryKeys.generate,
    mutationFn: async () =>
      request({
        method: "POST",
        path: `${API_ROUTES.stories}/generate`,
        body: { selectedCharacter: getSelectedCharacter() }
      }),
    ...options
  });
};
