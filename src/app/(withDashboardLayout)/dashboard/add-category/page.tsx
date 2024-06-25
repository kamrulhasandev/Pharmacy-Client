"use client";

import React from "react";
import "./add-category.css";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddCategory = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const imgbb_key = process.env.NEXT_PUBLIC_IMGBB_API;
  const imgbbUrl = `https://api.imgbb.com/1/upload?&key=${imgbb_key}`;

  const onSubmit = async (data: any) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imgbbUrl, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const imgUrl = res.data.data.url;
      const category = { name: data.categoryName, icon: imgUrl };
      const response = await axiosSecure.post(
        "/category/create-category",
        category
      );
      console.log(response);
      if (response.data.success === true) {
        reset();
        toast.success("Category added successfully");
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add-category-container">
      <h1>Add Category</h1>
      <form className="add-category-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            {...register("categoryName", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            {...register("image", { required: true })}
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
