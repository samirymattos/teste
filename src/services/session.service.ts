import { ILogin } from "@/interfaces/ILogin";
import api from "./api.service";
import { AxiosResponse } from "axios";
import { ISession } from "@/interfaces/ISession";

const auth = async ({
  email,
  password,
  company_id,
}: ILogin): Promise<AxiosResponse<ISession>> =>
  api.post("/login", {
    email,
    password,
    company_id,
  });

const changeCompanyToken = async (
  company_id: string
): Promise<AxiosResponse<ISession>> =>
  api.post("/change-company", {
    company_id,
  });

export const sessionService = {
  auth,
  changeCompanyToken,
};
