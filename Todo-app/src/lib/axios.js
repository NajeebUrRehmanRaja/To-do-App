import { API_BASE_URL } from "../utils/constants.js";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
