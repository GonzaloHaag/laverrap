import { API_URL } from "@/utils/consts";
import axios from "axios";
export const api = axios.create({
  baseURL: API_URL,
});
