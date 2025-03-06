import { ITagCreate } from "@/interfaces/ITag";
import apiService from "./api.service";

const create = async (data: ITagCreate) => apiService.post("/tags", data);

const update = async (id: string, data: ITagCreate) =>
  apiService.put(`/tags/${id}`, data);

const remove = async (id: string) => apiService.delete(`/tags/${id}`);

const getAll = async (query: string = "") => apiService.get("/tags" + query);

const getById = async (id: string) => apiService.get(`/tags/${id}`);

export const tagsService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
