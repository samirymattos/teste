import { IAffiliate } from "@/interfaces/IAffiliate";
import apiService from "./api.service";

const getAll = async (query: string = "") =>
  apiService.get(`/affiliateconsultants${query}`);

const getById = async (id: string) =>
  apiService.get(`/affiliateconsultants/${id}`);

const update = async (id: string, data: Partial<IAffiliate>) =>
  apiService.put(`/affiliateconsultants/${id}`, data);

const remove = async (id: string) =>
  apiService.delete(`/affiliateconsultants/${id}`);

const create = async (data: Partial<IAffiliate>) =>
  apiService.post("/affiliateconsultants", data);

export const affiliateService = {
  getAll,
  getById,
  update,
  remove,
  create,
};
