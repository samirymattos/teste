import { CookiesHandler } from "@/cookies";
import axios from "axios";

const api = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async config => {
    const session = await CookiesHandler.session.get();
    if (session && session.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  });

  return instance;
};

export default api();
