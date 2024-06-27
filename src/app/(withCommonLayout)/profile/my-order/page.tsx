'use client'

import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("No user email");
      }
      const response: AxiosResponse<any> = await axiosSecure.get(
        `/user/${user.email}`
      );
      return response.data.data;
    },
    enabled: !!user && !authLoading,
  });

  console.log(userData);
  return (
    <div>
      
    </div>
  );
};

export default MyOrder;
