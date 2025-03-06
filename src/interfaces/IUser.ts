import { UserRoles } from "@/enum/UserRoles";

export interface IUser {
  email: string;
  password?: string;
  name: string;
  is_active: boolean;
  role: UserRoles;

  id: string;
  created_at: string;
  updated_at: string;
}

export type IUserCreate = Omit<
  IUser,
  "id" | "created_at" | "updated_at" | "password"
> & {
  password: string;
  password_confirmation: string;
};
