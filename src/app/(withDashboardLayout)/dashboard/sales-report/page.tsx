"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import styles from "./SalesReport.module.css";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const today = dayjs().format("YYYY-MM-DD");
  const [query, setQuery] = useState(`?date=${today}`);
  const [selectedDate, setSelectedDate] = useState(today);

  const {
    data: sales,
    isLoading: salesLoading,
    error: salesError,
    refetch,
  } = useQuery<any, Error>({
    queryKey: ["sale", query],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get(
        `/sales/${query}`
      );
      return response.data.data;
    },
    enabled: !!query,
  });

  console.log(sales)

  console.log(query);



  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    setQuery(date ? `?date=${date}` : "");
  };

  const handleAllClick = () => {
    setSelectedDate("");
    setQuery(`?date=all`);
  };

  return (
    <div className={styles.allProductContainer}>
      <h1>Today Sales Report</h1>
      <div>
        <button onClick={handleAllClick}>All Sales Data</button>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Customer Email</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sales) && sales.length > 0 ? (
              sales.map((sale: any, index: number) => (
                <tr key={sale._id}>
                  <td data-label="No">{index + 1}</td>
                  <td data-label="Product Image">
                    <Image
                      src={sale.product.image}
                      alt={sale.product.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td data-label="Product Name">{sale.product.name}</td>
                  <td data-label="Customer Email">{sale.user.email}</td>
                  <td data-label="Quantity">{sale.quantity}</td>
                  <td data-label="Price">{sale.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
