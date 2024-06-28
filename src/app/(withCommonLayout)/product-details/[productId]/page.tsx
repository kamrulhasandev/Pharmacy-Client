"use client";

import Image from "next/image";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import styles from "./ProductDetails.module.css";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const axiosSecure = useAxiosSecure();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

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
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch,
  } = useQuery<any, Error>({
    queryKey: ["product", params.productId],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get(
        `/product/${params.productId}`
      );
      return response.data.data;
    },
    enabled: !!params.productId,
  });

  if (userLoading || productLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (userError || productError) {
    return (
      <div className={styles.container}>
        Error: {userError?.message || productError?.message}
      </div>
    );
  }

  console.log(product);

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      try {
        const buyingData = {
          product: product._id,
          user: userData._id,
          name: product.name,
          price: product.price,
          quantity: 1,
        };
        const res = await axiosSecure.post("/sales/add-sale", buyingData);

        if (res.status === 200) {
          toast.success("Sale successful!");
          refetch();
        } else {
          toast.error("Sale failed!");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productDetailsContainer}>
        <div className={styles.productInfo}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className={styles.image}
            />
          </div>
          <div className={styles.detailsContainer}>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.brand}>Brand: {product.brand}</p>
            <p className={styles.price}>Price: ${product.price}</p>
            <p className={styles.stock}>Stock: {product.stock}</p>
            <p className={styles.strength}>Strength: {product.strength}</p>
            <p className={styles.dosageForm}>
              Dosage Form: {product.dosageForm}
            </p>
            <p className={styles.expirationDate}>
              Expiration Date: {product.expirationDate}
            </p>
            <p className={styles.category}>
              Category: {product.categoryDetails.name}
            </p>
            {product.stock > 0 ? (
              <button className={styles.buyButton} onClick={handleBuyNow}>
                Buy Now
              </button>
            ) : (
              <p className={styles.outOfStock}>Out of Stock</p>
            )}
          </div>
        </div>
        <div className={styles.description}>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        <div className={styles.usageInstruction}>
          <h3>Usage Instruction</h3>
          <p>{product.usageInstructions}</p>
        </div>

        <div className={styles.reviewsContainer}>
          <h3>Reviews</h3>
          {product.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className={styles.reviewList}>
              {product.reviews.map((review: any) => (
                <li key={review._id} className={styles.reviewItem}>
                  <p className={styles.comment}>{review.comment}</p>
                  <p className={styles.rating}>Rating: {review.rating}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
