import axios from "axios";
import { SERVER_URL } from "./env";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export default axiosInstance;
