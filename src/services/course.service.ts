import { ICourse } from "@/interfaces/ICourse";
import apiService from "./api.service";

const getAll = async (query: string = "") =>
  apiService.get(`/courses${query}`);

const getById = async (id: string) =>
  apiService.get(`/courses/${id}`);

const update = async (id: string, data: Partial<ICourse>) =>
  apiService.put(`/courses/${id}`, data);

const remove = async (id: string) => 
  apiService.delete(`/courses/${id}`);

const create = async (data: Partial<ICourse>) =>
  apiService.post("/courses", data);

export const courseService = {
  getAll,
  getById,
  update,
  remove,
  create,
};