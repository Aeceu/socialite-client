import axios from "axios";

const baseURL = "https://socialite-server-azure.vercel.app/api/v1";

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
