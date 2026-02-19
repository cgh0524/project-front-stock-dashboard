import axios from "axios";

export const axiosClient = axios.create({
  timeout: 10_000,
  baseURL: '/stock-dashboard',
  headers: {
    "Content-Type": "application/json",
  },
});
