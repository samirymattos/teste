import { IUser } from "@/interfaces/IUser";
import apiService from "./api.service";

const getAll = async (query: string = "") => apiService.get(`/users${query}`);

const getById = async (id: string) => apiService.get(`/users/${id}`);

const update = async (id: string, data: Partial<IUser>) =>
  apiService.put(`/users/${id}`, data);

const remove = async (id: string) => apiService.delete(`/users/${id}`);

const create = async (data: Partial<IUser>) => apiService.post("/users", data);

export const userService = {
  getAll,
  getById,
  update,
  remove,
  create,
};
