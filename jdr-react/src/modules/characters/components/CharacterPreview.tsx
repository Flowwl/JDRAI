import * as React from "react";
import { FC } from "react";
import { Character } from "../types";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { getSelectedCharacter } from "@/modules/characters";
import cx from "classnames";

interface CharacterPreviewProps {
  className?: string;
  char: Character;
}

const CharacterPreview: FC<CharacterPreviewProps> = ({ className, char }) => {
  const selectedCharacter = getSelectedCharacter();
  const isCharSelected = selectedCharacter && selectedCharacter.firstName === char.firstName;
  return (
    <ul
      className={cx(
        "cursor-pointer hover:scale-105 transition duration-200",
        {
          "border-2 border-gray-50": !isCharSelected,
          "border-primary-300 border-2": isCharSelected
        },
        className
      )}
      onClick={() => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_CHARACTER, JSON.stringify(char));
      }}
    >
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
  );
};

export default CharacterPreview;
