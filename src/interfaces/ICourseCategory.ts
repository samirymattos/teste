export interface ICourseCategory {
    id: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
  }
  
  export type ICourseCategoryCreate = Omit<
    ICourseCategory,
    "id" | "created_at" | "updated_at"
  >;
  