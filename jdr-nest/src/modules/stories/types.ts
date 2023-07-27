import { Prop } from "@nestjs/mongoose";

export class Story {
  @Prop()
  description: string;
}

export const CHARACTERISTICS = ["description"];
