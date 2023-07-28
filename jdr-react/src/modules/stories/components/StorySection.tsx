import * as React from "react";
import { FC } from "react";
import { Button, Spinner } from "@/components/atoms";
import { useGenerateStories } from "@/modules/stories";
import cx from "classnames";

interface SelectCharacterSectionProps {
  className?: string;
}

const StorySection: FC<SelectCharacterSectionProps> = ({ className }) => {
  const { mutate: generateStory, data, isLoading } = useGenerateStories();

  const onSubmit = async () => {
    await generateStory();
  };

  return (
    <div className={cx(className)}>
      <Button onClick={onSubmit}>Generate Story with selected Character</Button>
      {isLoading && <Spinner />}
      <div className="flex ">
        {data && (
          <div className="flex flex-col justify-center mx-auto mt-5">
            <div className={"border border-gray-50"}>{data.description}</div>
            <div className={"flex justify-between mt-3 gap-3"}>
              {data.actions.map((action) => (
                <p
                  key={action}
                  className="border border-primary-300 cursor-pointer hover:scale-105 transition duration-200"
                >
                  {action}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorySection;
