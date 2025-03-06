export interface ISupplier {
    id: string;
    name: string;
    document: string;
    os_key: string;
    email?: string;
    phone?: string;
    observation?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export type ISupplierCreate = Omit<
    ISupplier,
    "id" | "created_at" | "updated_at"
  >;
  