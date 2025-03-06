import apiService from "./api.service";
import { IDefaultDocumentation } from "@/interfaces/IDefaultDocumentation";

const getAll = async (query: string = "") =>
  apiService.get(`/default-documentations${query}`);

const getById = async (id: string) =>
  apiService.get(`/default-documentations/${id}`);

export const defaultDocumentationService = {
  getAll,
  getById,
};