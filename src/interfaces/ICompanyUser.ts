import { ICompany } from "./ICompany";
import { IUser } from "./IUser";

export interface ICompanyUser {
  company_id: string;
  user_id: string;
  profile_id?: string;
  company: ICompany;
  user: IUser;

  id: string;
  created_at: string;
  updated_at: string;
}

export type ICompanyUserCreate = Omit<
  ICompanyUser,
  "id" | "created_at" | "updated_at" | "company" | "user"
>;
