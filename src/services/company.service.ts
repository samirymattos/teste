import apiService from "./api.service";
import { ICompanyCreate } from "@/interfaces/ICompany";

const create = async (data: ICompanyCreate) =>
  apiService.post("/companies", data);

const update = async (id: string, data: ICompanyCreate) =>
  apiService.put(`/companies/${id}`, data);

const remove = async (id: string) => apiService.delete(`/companies/${id}`);

const getAll = async (query: string = "") =>
  apiService.get("/companies" + query);

const getById = async (id: string) => apiService.get(`/companies/${id}`);

export const companyService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
