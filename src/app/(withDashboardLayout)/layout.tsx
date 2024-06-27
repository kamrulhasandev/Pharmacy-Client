"use client";
import React, { useState } from "react";
import "./layout.css";
import useAdmin from "@/hooks/useAdmin";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaPlus,
  FaList,
  FaProductHunt,
  FaChartLine,
} from "react-icons/fa";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, isAdminLoading] = useAdmin();
  const pathname = usePathname();
  console.log(pathname);

  console.log(isAdmin);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <header className="header">
        <div className="header-content">
          <button className="toggle-button" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
      </header>

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <a href="/">MedLane</a>
        </div>
        <nav className="navigation">
          <ul>
            <li className={pathname === "/dashboard" ? "active" : ""}>
              <a href="/dashboard">
                <FaHome />
                <p>Dashboard Home</p>
              </a>
            </li>
            <li className={pathname === "/dashboard/add-category" ? "active" : ""}>
              <a href="/dashboard/add-category">
                <FaPlus />
                <p>Add Category</p>
              </a>
            </li>
            <li className={pathname === "/dashboard/all-category" ? "active" : ""}>
              <a href="/dashboard/all-category">
                <FaList />
                <p>All Category</p>
              </a>
            </li>
            <li className={pathname === "/dashboard/add-product" ? "active" : ""}>
              <a href="/dashboard/add-product">
                <FaPlus />
                <p>Add Product</p>
              </a>
            </li>
            <li className={pathname === "/dashboard/all-product" ? "active" : ""}>
              <a href="/dashboard/all-product">
                <FaProductHunt />
                <p>All Product</p>
              </a>
            </li>
            <li className={pathname === "/dashboard/sales-report" ? "active" : ""}>
              <a href="/dashboard/sales-report">
                <FaChartLine />
                <p>Sales Report</p>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
