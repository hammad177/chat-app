import axios from "axios";
import { AUTH_TOKEN_KEY, SERVER_URL } from "./env";
import { getToken } from "../libs";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken(AUTH_TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { axiosInstance };
