import axios from "axios";

export const axiosClient = axios.create({
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
