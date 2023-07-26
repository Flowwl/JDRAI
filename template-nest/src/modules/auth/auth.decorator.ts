import { SetMetadata } from "@nestjs/common";

export const IS_AUTHED_KEY = "isAuthed";
export const Authed = () => SetMetadata(IS_AUTHED_KEY, true)
