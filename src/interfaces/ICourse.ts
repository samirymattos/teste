import { CourseTypes } from "@/enum/CourseTypes";

export interface ICourse {
    name: string;
    description: string;
    is_active: boolean;
    is_supplier_priority: boolean;
    is_enable_website: boolean;
    cost_value: number;
    sale_value: number;
    percentage_discount_cash: number;
    percentage_discount_installments: number;
    workload: number;
    modality: CourseTypes;
    document_delivery_time: number;
    requirements: string;
    observation: string;
    hidden_observation: string;
    is_enable_to_affiliate_consultant: boolean;
    cost_affiliate_consultant: number;
    affiliate_consultant_observation: string;
    course_category_id: string;
    supplier_id: string;
    company_id: string;

    course_documentations: {
        type: string;
        default_documentation_id: string;
    }[];
    
    id: string;
    created_at: string;
    updated_at: string;
  }
  
  export type ICourseCreate = Omit<ICourse, "id" | "created_at" | "updated_at">;