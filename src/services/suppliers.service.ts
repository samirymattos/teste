import { ISupplier } from "@/interfaces/ISuppliers";
import apiService from "./api.service";

const getAll = async (query: string = "") =>
  apiService.get(`/suppliers${query}`);

const getById = async (id: string) =>
  apiService.get(`/suppliers/${id}`);

const update = async (id: string, data: Partial<ISupplier>) =>
  apiService.put(`/suppliers/${id}`, data);

const remove = async (id: string) =>
  apiService.delete(`/suppliers/${id}`);

const create = async (data: Partial<ISupplier>) =>
  apiService.post("/suppliers", data);

export const supplierService = {
  getAll,
  getById,
  update,
  remove,
  create,
};
