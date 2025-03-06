import { ICourseCategory } from "@/interfaces/ICourseCategory";
import apiService from "./api.service";

const getAll = async (query: string = "") =>
  apiService.get(`/coursecategories${query}`);

const getById = async (id: string) =>
  apiService.get(`/coursecategories/${id}`);

const update = async (id: string, data: Partial<ICourseCategory>) =>
  apiService.put(`/coursecategories/${id}`, data);

const remove = async (id: string) =>
  apiService.delete(`/coursecategories/${id}`);

const create = async (data: Partial<ICourseCategory>) =>
  apiService.post("/coursecategories", data);

export const courseCategoryService = {
  getAll,
  getById,
  update,
  remove,
  create,
};
