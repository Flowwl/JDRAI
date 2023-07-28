import { Story } from "../types";
import { storiesQueryKeys } from "./_storiesQueryKeys";
import { API_ROUTES } from "@/constants/api";
import { MutationParams, MutationResult, useMutation } from "@/hooks/useQuery";
import { getSelectedCharacter } from "@/modules/characters";
import { request } from "@/utils/axios";

type GenerateStory = {
  choosenAction: string;
  previousStory: string;
};

export const useGenerateStories = (
  options?: MutationParams<{ previousStoryLine?: GenerateStory }, Story>
): MutationResult<{ previousStoryLine?: GenerateStory }, Story> => {
  return useMutation({
    mutationKey: storiesQueryKeys.generate,
    mutationFn: async (body) =>
      request({
        method: "POST",
        path: `${API_ROUTES.stories}/generate`,
        body: {
          selectedCharacter: getSelectedCharacter(),
          ...(body.previousStoryLine ? { previousStoryLine: body.previousStoryLine } : {})
        }
      }),
    ...options
  });
};
