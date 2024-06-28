import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://pharmacy-server.vercel.app/api",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
