'use client';

import axios from "axios";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";

const axiosSecure = axios.create({
  baseURL: "https://pharmacy-server.vercel.app/api",
});
const useAxiosSecure = () => {
  const router = useRouter();
  const { logout } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");

      config.headers.authorization = token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logout();
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
