import { Prop } from "@nestjs/mongoose";

export class Story {
  @Prop()
  description: string;

  @Prop()
  actions: string[];
}
