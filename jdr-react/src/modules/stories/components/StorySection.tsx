import * as React from "react";
import { FC, useState } from "react";
import { Button, Spinner } from "@/components/atoms";
import { Story, useGenerateStories } from "@/modules/stories";
import cx from "classnames";

interface SelectCharacterSectionProps {
  className?: string;
}

const StorySection: FC<SelectCharacterSectionProps> = ({ className }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const { mutate: generateStory, isLoading } = useGenerateStories({
    onSuccess(data) {
      setStories((prevState) => [...prevState, data]);
    }
  });

  const onSubmit = async () => {
    await generateStory({});
  };

  const chooseAction = async (action: string, storyDescription: string) => {
    await generateStory({ previousStoryLine: { choosenAction: action, previousStory: storyDescription } });
  };

  return (
    <div className={cx(className)}>
      <Button onClick={onSubmit}>Generate Story with selected Character</Button>
      <div className="flex flex-col">
        {stories.map((story) => (
          <div key={story.description} className="flex flex-col justify-center mx-auto mt-5">
            <div className={"border border-gray-50"}>{story.description}</div>
            <div className={"flex justify-between mt-3 gap-3"}>
              {story.actions.map((action) => (
                <p
                  key={action}
                  className="border border-primary-300 cursor-pointer hover:scale-105 transition duration-200"
                  onClick={() => chooseAction(action, story.description)}
                >
                  {action}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};

export default StorySection;
