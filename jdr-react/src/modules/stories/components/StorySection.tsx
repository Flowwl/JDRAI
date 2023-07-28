import * as React from "react";
import { FC } from "react";
import { Button, Spinner } from "@/components/atoms";
import { useGenerateStories } from "@/modules/stories";
import cx from "classnames";

interface SelectCharacterSectionProps {
  className?: string;
}

const StorySection: FC<SelectCharacterSectionProps> = ({ className }) => {
  const { mutate: generateCharacter, data, isLoading } = useGenerateStories();

  const onSubmit = async () => {
    await generateCharacter();
  };

  return (
    <div className={cx(className)}>
      <Button onClick={onSubmit}>GenerateCharacters</Button>
      {isLoading && <Spinner />}
      <div className="flex">{data && data.description}</div>
    </div>
  );
};

export default StorySection;
