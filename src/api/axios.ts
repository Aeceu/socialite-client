import axios from "axios";

const baseURL = "https://socialite-server-azure.vercel.app";

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
