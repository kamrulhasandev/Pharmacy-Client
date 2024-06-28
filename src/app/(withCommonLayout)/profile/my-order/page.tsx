"use client";

import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "./my-order.module.css";
import toast from "react-hot-toast";

interface Order {
  _id: string;
  product: {
    _id: string;
    image: string;
    name: string;
    // Add other properties as needed
  };
  price: number;
  // Add other properties as needed
}

const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(1); // Default rating

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

  const {
    data: orders,
    isLoading: orderLoading,
    error: orderError,
    refetch: refetchOrders,
  } = useQuery<Order[], Error>({
    queryKey: ["orders", userData?._id],
    queryFn: async () => {
      if (!userData?._id) {
        throw new Error("No user id");
      }
      const response: AxiosResponse<{ data: Order[] }> = await axiosSecure.get(
        `/sales/user/${userData?._id}`
      );
      return response.data.data;
    },
    enabled: !!user && !authLoading,
  });

  const handleAddReviewClick = (orderId: string) => {
    setCurrentOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = async () => {
    if (!currentOrderId || !userData?._id) {
      console.error("Missing order ID or user ID");
      return;
    }

    const reviewData = {
      user: userData._id,
      product: currentOrderId,
      comment: reviewContent,
      rating: reviewRating,
    };

    console.log("Review data:", reviewData);

    try {
      const response = await axiosSecure.post(`/review/add-review`, reviewData);

      if (response.data.success) {
        toast.success("Review submitted successfully");
        await refetchOrders();
        setIsModalOpen(false);
        setReviewContent("");
        setReviewRating(1);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (userLoading || orderLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (userError || orderError) {
    return <div className={styles.error}>An error occurred</div>;
  }

  return (
    <div className={styles.allOrderContainer}>
      <h1 className={styles.heading}>My Orders</h1>
      <div className={styles.tableContainer}>
        <table className={styles.customTable}>
          <thead className={styles.customThead}>
            <tr>
              <th className={styles.customTh}>No</th>
              <th className={styles.customTh}>Image</th>
              <th className={styles.customTh}>Name</th>
              <th className={styles.customTh}>Price</th>
              <th className={styles.customTh}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.customTbody}>
            {orders?.map((order: Order, index: number) => (
              <tr key={order._id}>
                <td className={styles.customTd} data-label="No">
                  {index + 1}
                </td>
                <td className={styles.customTd} data-label="Image">
                  <Image
                    src={order.product.image}
                    alt="order image"
                    width={50}
                    height={50}
                  />
                </td>
                <td className={styles.customTd} data-label="Name">
                  {order.product.name}
                </td>
                <td className={styles.customTd} data-label="Price">
                  {order.price}
                </td>
                <td className={styles.actionButtons} data-label="Actions">
                  <button
                    className={styles.edit}
                    onClick={() => handleAddReviewClick(order.product._id)}
                  >
                    Add Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add Review</h2>
            <textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="Write your review here..."
            />
            <label>
              Rating:
              <input
                type="number"
                value={reviewRating}
                min={1}
                max={5}
                onChange={(e) => setReviewRating(parseInt(e.target.value))}
              />
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleReviewSubmit}>Submit</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
