import { FullUser } from "@/modules/users/types";

export type Login = Pick<FullUser, "email" | "password">;
