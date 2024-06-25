"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import "./all-category.css";
import Image from "next/image";

const AllCategory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: categories, isLoading } = useQuery<any, Error>({
    queryKey: ["category"],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get("/category");
      return response.data.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="all-category-container">
      <h1>All Category</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Icon</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: any, index: number) => (
              <tr key={category._id}>
                <td data-label="No">{index + 1}</td>
                <td data-label="Icon">
                  {category.icon ? (
                    <Image
                      src={
                        category.icon.startsWith("http")
                          ? category.icon
                          : `/${category.icon}`
                      }
                      alt="category icon"
                      width={50}
                      height={50}
                    />
                  ) : (
                    "No Icon"
                  )}
                </td>
                <td data-label="Name">{category.name}</td>
                <td data-label="Action" className="action-buttons">
                  <button className="delete-btn">Delete</button>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;
