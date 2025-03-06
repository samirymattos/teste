import { ICompanyUserCreate } from "@/interfaces/ICompanyUser";
import apiService from "./api.service";

const getAll = async (query: string = "") =>
  apiService.get(`/company-users${query}`);

const getById = async (id: string) => apiService.get(`/company-users/${id}`);

const update = async (id: string, data: Partial<ICompanyUserCreate>) =>
  apiService.put(`/company-users/${id}`, data);

const remove = async (id: string) => apiService.delete(`/company-users/${id}`);

const create = async (data: Partial<ICompanyUserCreate>) =>
  apiService.post("/company-users", data);

export const companyUserService = {
  getAll,
  getById,
  update,
  remove,
  create,
};
