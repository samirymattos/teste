import apiService from "./api.service";

const create = async (data: FormData) =>
  apiService.post("/companiesdata", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const update = async (id: string, data: FormData) =>
  apiService.put(`/companiesdata/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const remove = async (id: string) => apiService.delete(`/companiesdata/${id}`);

const getAll = async (query: string = "") =>
  apiService.get("/companiesdata" + query);

const getById = async (id: string) => apiService.get(`/companiesdata/${id}`);

export const companyDataService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
