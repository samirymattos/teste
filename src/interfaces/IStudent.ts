import { StudentGender } from "@/enum/StudentGender";
import { Dayjs } from "dayjs";

export interface IStudent {
  name: string;
  cpf: string;
  rg: string;
  birthdate: string | Dayjs;
  email: string;
  phone: string;
  gender: StudentGender;
  nationality: string;
  observation?: string;

  id: string;
  created_at: string;
  updated_at: string;
}

export type IStudentCreate = Omit<IStudent, "id" | "created_at" | "updated_at">;


export type IStudentSaleCreate =  Omit<IStudentCreate, "birthdate" | "gender" | "rg">;