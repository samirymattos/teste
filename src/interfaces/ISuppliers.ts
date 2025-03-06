export interface ISupplier {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at: string;
    updated_at: string;
  }
  
  export type ISupplierCreate = Omit<
    ISupplier,
    "id" | "created_at" | "updated_at"
  >;
  