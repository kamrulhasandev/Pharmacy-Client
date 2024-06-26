"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import "./all-product.css"; // Import the CSS file
import Image from "next/image";
import { useState } from "react";
import ProductModal from "@/components/UI/ProductModal/ProductModal";
import Link from "next/link";
import Swal from "sweetalert2";

const AllProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products using react-query
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery<any, Error>({
    queryKey: ["product"],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get("/product");
      return response.data.data;
    },
  });

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleDelete = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(
            `/product/delete-product/${productId}`
          );
          if (response.data.success) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Error", "Failed to delete product.", "error");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error", "Failed to delete product.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="all-product-container">
      <h1>All Products</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Dosage Form</th>
              <th>Strength</th>
              <th>Stock</th>
              <th>Expire Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product: any, index: number) => (
                <tr key={product._id}>
                  <td data-label="No">{index + 1}</td>
                  <td data-label="Image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td data-label="Name">{product.name}</td>
                  <td data-label="Price">{product.price}</td>
                  <td data-label="Category">{product.categoryDetails.name}</td>
                  <td data-label="Brand">{product.brand}</td>
                  <td data-label="Dosage Form">{product.dosageForm}</td>
                  <td data-label="Strength">{product.strength}</td>
                  <td data-label="Stock">{product.stock}</td>
                  <td data-label="Expire Date">{product.expirationDate}</td>
                  <td data-label="Action" className="action-buttons">
                    <button
                      className="delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                    <Link href={`/dashboard/all-product/${product._id}`}>
                      <button className="edit">Edit</button>
                    </Link>
                    <button className="view" onClick={() => openModal(product)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11}>No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default AllProduct;
