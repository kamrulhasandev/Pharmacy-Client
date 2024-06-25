import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

interface AdminResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    admin: boolean;
  };
}

const useAdmin = (): [boolean | undefined, boolean] => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: adminResponse, isLoading: isAdminLoading } =
    useQuery<AdminResponse>({
      queryKey: [user?.email, "isAdmin"],
      enabled: !!user && !loading,
      queryFn: async (): Promise<AdminResponse> => {
        if (!user?.email) {
          return {
            statusCode: 200,
            success: false,
            message: "No user email",
            data: { admin: false },
          };
        }
        console.log("asking or checking is admin", user);
        const res = await axiosSecure.get<AdminResponse>(
          `/user/get-admin/${user.email}`
        );
        return res.data;
      },
    });

  return [adminResponse?.data?.admin, isAdminLoading];
};

export default useAdmin;
