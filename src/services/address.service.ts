import { IAddressCreate } from "@/interfaces/IAddress";
import apiService from "./api.service";

const create = async (data: IAddressCreate) =>
  apiService.post("/addresses", data);

const update = async (id: string, data: IAddressCreate) =>
  apiService.put(`/addresses/${id}`, data);

const remove = async (id: string) => apiService.delete(`/addresses/${id}`);

const getAll = async (query: string = "") =>
  apiService.get("/addresses" + query);

const getById = async (id: string) => apiService.get(`/addresses/${id}`);

export const addressService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
