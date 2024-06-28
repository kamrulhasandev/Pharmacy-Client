"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

import "./edit-product.css";
import toast from "react-hot-toast";

const EditProduct = ({ params }: { params: { productId: string } }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      brand: "",
      dosageForm: "",
      strength: "",
      stock: 0,
      expirationDate: "",
      usageInstructions: "",
    },
  });

  const axiosSecure = useAxiosSecure();

  const { data: product, isLoading: isLoadingProduct } = useQuery<any, Error>({
    queryKey: ["product", params.productId],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get(
        `/product/${params.productId}`
      );
      return response.data.data;
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        price: product.price || 0,
        brand: product.brand || "",
        dosageForm: product.dosageForm || "",
        strength: product.strength || "",
        stock: product.stock || 0,
        expirationDate: product.expirationDate || "",
        usageInstructions: product.usageInstructions || "",
        description: product.description || "",
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const updatedData = {
      name: data.name,
      price: parseInt(data.price),
      brand: data.brand,
      dosageForm: data.dosageForm,
      strength: data.strength,
      stock: parseInt(data.stock),
      expirationDate: data.expirationDate,
      usageInstructions: data.usageInstructions,
      description: data.description,
    };
    const response = await axiosSecure.put(
      `/product/edit-product/${params.productId}`,
      updatedData
    );
   
    if (response.data.success) {
      toast.success("Product updated successfully");
      reset(updatedData);
    }
  };

  return (
    <div className="add-category-container">
      <h1>Edit Product</h1>
      <form className="add-category-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" {...register("name")} />
          </div>
          <div className="form-col">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" {...register("price")} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="brand">Brand</label>
            <input type="text" id="brand" {...register("brand")} />
          </div>
          <div className="form-col">
            <label htmlFor="dosageForm">Dosage Form</label>
            <input type="text" id="dosageForm" {...register("dosageForm")} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="strength">Strength</label>
            <input type="text" id="strength" {...register("strength")} />
          </div>
          <div className="form-col">
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" {...register("stock")} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              type="date"
              id="expirationDate"
              {...register("expirationDate")}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="usageInstructions">Usage Instructions</label>
            <textarea
              id="usageInstructions"
              {...register("usageInstructions")}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="description">Description</label>
            <textarea id="description" {...register("description")} />
          </div>
        </div>
        <button type="submit">Update Now</button>
      </form>
    </div>
  );
};

export default EditProduct;
