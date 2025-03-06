export interface IService<T, U = T> {
  create: (data: T) => Promise<Response>;
  getById: (id: string) => Promise<Response>;
  getAll: (query?: string) => Promise<Response>;
  update: (id: string, data: { data: U }) => Promise<Response>;
  remove: (id: number | string) => Promise<Response>;
}
