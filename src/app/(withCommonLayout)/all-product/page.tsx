"use client";
// Import necessary modules and components
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import styles from "./all-product.module.css";

const AllProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
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

  console.log(products);

  // Filter products based on search query
  const filteredProducts = products?.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Product</h1>
      <div className={styles.search}>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.grid}>
        {filteredProducts?.map((product: any) => (
          <Link
            href={`/product-details/${product._id}`}
            key={product.id}
            className={styles.card}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={300}
              className={styles.image}
            />
            <div className={styles.details}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 className={styles.name}>{product.name}</h2>
                <p style={{ fontWeight: "bold" }} className={styles.price}>BDT: <span style={{ color: "green" }}>{product.price}</span></p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className={styles.category}>
                Category: {product.categoryDetails.name}
              </p>
              <p className={styles.stock}>Stock: {product.stock}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
