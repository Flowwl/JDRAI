import * as React from "react";
import { FC } from "react";
import { Spinner } from "@/components/atoms";
import { Button } from "@/components/atoms/actions";
import { useGenerateCharacters } from "@/modules/characters/services";

const MainView: FC = () => {
  const { mutate: generateCharacter, data, isLoading } = useGenerateCharacters();

  const onSubmit = async () => {
    await generateCharacter();
  };

  return (
    <div className={"bg-gray-300 text-gray-50 h-screen flex"}>
      <div className="mx-auto my-auto flex flex-col text-center gap-8">
        <h1 className="text-xl">JDRAI</h1>
        <Button onClick={onSubmit}>GenerateCharacters</Button>

        {isLoading && <Spinner />}
        <div className="flex">
          {data &&
            data.map((char) => (
              <ul key={char.lastName}>
                <li>
                  {char.firstName} {char.lastName}
                </li>
                <li>Race: {char.race}</li>
                <li>Class: {char.class}</li>
                <li>Level: {char.level}</li>
                <li>PV: {char.pv}</li>
                <li>Constitution: {char.constitution}</li>
                <li>Charisma: {char.charisma}</li>
                <li>Dexterity: {char.dexterity}</li>
                <li>Intelligence: {char.intelligence}</li>
                <li>Strength: {char.strength}</li>
                <li>Wisdom: {char.wisdom}</li>
                <li>StoryLine: {char.story}</li>
                {char.inventory && <li>Inventory: {char.inventory.join(", ")}</li>}
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainView;
