import { ROLES } from "./constants";

export type FullUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  telephone?: string;
  password: string;
  isConfirmed?: boolean;
  color?: string;
  roleId?: ROLES;
  permissionList: string[];
};

export type User = Omit<FullUser, "password">;
