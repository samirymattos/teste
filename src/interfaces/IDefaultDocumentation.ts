export interface IDefaultDocumentation {
    id: string;
    name: string;
    is_active: boolean;
    type: string;
    is_required_for_registration: boolean;
  }
  
  export type IDefaultDocumentationCreate = Omit<
    IDefaultDocumentation,
    "id"
  >;