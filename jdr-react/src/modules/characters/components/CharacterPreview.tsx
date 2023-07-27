import * as React from "react";
import { FC } from "react";
import { Character } from "../types";

interface CharacterPreviewProps {
  className?: string;
  char: Character;
}

const CharacterPreview: FC<CharacterPreviewProps> = ({ className, char }) => {
  return (
    <ul>
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
