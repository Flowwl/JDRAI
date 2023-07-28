import { Prop } from "@nestjs/mongoose";

export class Character {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  race: string;

  @Prop()
  class: string;

  @Prop()
  level: number;

  @Prop()
  pv: number;

  @Prop()
  strength: number;

  @Prop()
  dexterity: number;

  @Prop()
  constitution: number;

  @Prop()
  intelligence: number;

  @Prop()
  wisdom: number;

  @Prop()
  charisma: number;

  @Prop()
  story: string;

  @Prop()
  inventory: string[];

  img?: string;
}
