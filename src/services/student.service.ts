import { IStudentCreate } from "@/interfaces/IStudent";
import apiService from "./api.service";

const create = async (data: Partial<IStudentCreate>) =>
  apiService.post("/students", data);

const update = async (id: string, data: Partial<IStudentCreate>) =>
  apiService.put(`/students/${id}`, data);

const remove = async (id: string) => apiService.delete(`/students/${id}`);

const getAll = async (query: string = "") =>
  apiService.get("/students" + query);

const getById = async (id: string) => apiService.get(`/students/${id}`);

export const studentService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
