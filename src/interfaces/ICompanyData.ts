export interface ICompanyData {
  company_id: string;
  fantasy_name: string;
  document: string;
  phone: string;
  email: string;
  logo: string;

  id: string;
  created_at: string;
  updated_at: string;
}

export type ICompanyDataCreate = Omit<
  ICompanyData,
  "id" | "created_at" | "updated_at" | "logo"
>;
