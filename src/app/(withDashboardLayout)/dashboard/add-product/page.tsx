"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import "./add-product.css";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useState } from "react";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const imgbb_key = process.env.NEXT_PUBLIC_IMGBB_API;
  const imgbbUrl = `https://api.imgbb.com/1/upload?&key=${imgbb_key}`;

  // Fetch categories using react-query
  const { data: categories, isLoading } = useQuery<any, Error>({
    queryKey: ["category"],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get("/category");
      return response.data.data;
    },
  });

  console.log(categories);

  const onSubmit = async (data: any) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imgbbUrl, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const imgUrl = res.data.data.url;

      const productItem = {
        name: data.productName,
        description: data.description,
        price: parseInt(data.price),
        category: data.categoryId,
        brand: data.brand,
        dosageForm: data.dosageForm,
        strength: data.strength,
        stock: parseInt(data.stock),
        image: imgUrl,
        expirationDate: data.expirationDate,
        usageInstructions: data.usageInstructions,
      };
      console.log(productItem);
        const response = await axiosSecure.post(
          "/product/create-product",
          productItem
        );
        console.log(response);
        if (response.data.success === true) {
          reset();
          toast.success("Product added successfully");
        }
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add-category-container">
      <h1>Add Product</h1>
      <form className="add-category-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              {...register("productName", { required: true })}
            />
            {errors.productName && (
              <span className="error-message">Product Name is required</span>
            )}
          </div>
          <div className="form-col">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="error-message">Price is required</span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              {...register("brand", { required: true })}
            />
            {errors.brand && (
              <span className="error-message">Brand is required</span>
            )}
          </div>
          <div className="form-col">
            <label htmlFor="dosageForm">Dosage Form</label>
            <input
              type="text"
              id="dosageForm"
              {...register("dosageForm", { required: true })}
            />
            {errors.dosageForm && (
              <span className="error-message">Dosage Form is required</span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="strength">Strength</label>
            <input
              type="text"
              id="strength"
              {...register("strength", { required: true })}
            />
            {errors.strength && (
              <span className="error-message">Strength is required</span>
            )}
          </div>
          <div className="form-col">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              {...register("stock", { required: true })}
            />
            {errors.stock && (
              <span className="error-message">Stock is required</span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              type="date"
              id="expirationDate"
              {...register("expirationDate", { required: true })}
            />
            {errors.expirationDate && (
              <span className="error-message">Expiration Date is required</span>
            )}
          </div>
          <div className="form-col">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              {...register("categoryId", { required: true })}
            >
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                categories.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            {errors.categoryId && (
              <span className="error-message">Category is required</span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="usageInstructions">Usage Instructions</label>
            <textarea
              id="usageInstructions"
              {...register("usageInstructions", { required: true })}
            />
            {errors.usageInstructions && (
              <span className="error-message">
                Usage Instructions are required
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="error-message">Description is required</span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="error-message">Image is required</span>
            )}
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
