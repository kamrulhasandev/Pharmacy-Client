'use client';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AxiosResponse } from "axios";

const HomePage: React.FC = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<any, Error>({
    queryKey: ['category'],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get('/category');
      return response.data.data;
    },
  });

  console.log(categories);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>This is HomePage component</h1>
      {categories && (
        <ul>
          {categories?.map((category: any) => (
            <li key={category._id}>
              <h2>{category.name}</h2>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
