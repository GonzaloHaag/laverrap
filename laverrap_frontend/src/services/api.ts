import { API_URL } from "@/utils/const";
import axios from "axios";
export const api = axios.create({
  baseURL: API_URL,
});
