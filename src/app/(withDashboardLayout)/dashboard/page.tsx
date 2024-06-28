'use client'
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { FaShoppingCart, FaUsers, FaBox, FaTags } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import './DashboardHome.css'

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: metaData, isLoading } = useQuery<any, Error>({
    queryKey: ["meta-data"],
    queryFn: async () => {
      const response: AxiosResponse<any> = await axiosSecure.get("/meta-data");
      return response.data.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-card-content">
          <FaBangladeshiTakaSign className="dashboard-icon" />
          <p>Today Sale Amount</p>
          <h1>{metaData?.totalSaleAmount}</h1>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-card-content">
          <FaShoppingCart className="dashboard-icon" />
          <p>Today Sale Quantity</p>
          <h1>{metaData?.totalSaleCount}</h1>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-card-content">
          <FaUsers className="dashboard-icon" />
          <p>Total Users</p>
          <h1>{metaData?.totalUsers}</h1>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-card-content">
          <FaBox className="dashboard-icon" />
          <p>Total Product</p>
          <h1>{metaData?.totalProducts}</h1>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-card-content">
          <FaTags className="dashboard-icon" />
          <p>Total Categories</p>
          <h1>{metaData?.totalCategories}</h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
