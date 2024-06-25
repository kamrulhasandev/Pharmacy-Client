'use client';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AxiosResponse } from "axios";

const HomePage: React.FC = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<any, Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get('/product');
      return response.data.data;
    },
  });

  console.log(products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>This is HomePage component</h1>
      {products && (
        <ul>
          {products?.map((product: any) => (
            <li key={product._id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
