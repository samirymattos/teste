export interface IAffiliate {
  name: string;
  document: string;
  is_active: boolean;
  email: string;
  phone: string;
  observation: string;

  id: string;
  created_at: string;
  updated_at: string;
}

export type IAffiliateCreate = Omit<
  IAffiliate,
  "id" | "created_at" | "updated_at"
>;
