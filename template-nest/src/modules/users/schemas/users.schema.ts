import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Role } from "@backend/roles";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class User {
  _id: Types.ObjectId;

  @ApiProperty({ example: "test@gmail.com", description: "The user email" })
  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ select: false, required: true })
  password: string;

  @ApiProperty({
    example: true,
    description: "The user's email confirmation value. True if user has validated its email"
  })
  @Prop({ require: false, default: false })
  isConfirmed: boolean;

  @ApiProperty({ example: "1234", description: "Confirmation to reset user's password" })
  @Prop({ required: false })
  confirmationCode?: string;

  @ApiProperty({ example: ["user"], description: "The roles of the user" })
  @Prop({ required: true, default: ["user"] })
  roles: Role[];
  
  @Prop({ default: null })
  accessToken: string | null;
}

export const UsersSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
