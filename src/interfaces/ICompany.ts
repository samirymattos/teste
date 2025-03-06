import { UploadFile } from "antd";
import { ICompanyData, ICompanyDataCreate } from "./ICompanyData";

export interface ICompany {
  name: string;
  is_active: boolean;
  companyData: ICompanyData;

  id: string;
  created_at: string;
  updated_at: string;
}

export type ICompanyCreate = Omit<
  ICompany,
  "id" | "created_at" | "updated_at" | "companyData"
>;

export interface ICompanyCreateForm extends ICompanyDataCreate {
  name: string;
  is_active: boolean;
  logo: UploadFile[];
}
