import * as React from "react";
import { FC } from "react";
import { Button, Spinner } from "@/components/atoms";
import { useGenerateCharacters } from "@/modules/characters";
import CharacterPreview from "@/modules/characters/components/CharacterPreview";
import cx from "classnames";

interface SelectCharacterSectionProps {
  className?: string;
}

const SelectCharacterSection: FC<SelectCharacterSectionProps> = ({ className }) => {
  const { mutate: generateCharacter, data, isLoading } = useGenerateCharacters();

  const onSubmit = async () => {
    await generateCharacter();
  };

  return (
    <div className={cx(className)}>
      <Button onClick={onSubmit}>GenerateCharacters</Button>
      {isLoading && <Spinner />}
      <div className="flex mt-5">
        {data && data.map((char) => <CharacterPreview key={char.firstName} char={char} />)}
      </div>
    </div>
  );
};

export default SelectCharacterSection;
