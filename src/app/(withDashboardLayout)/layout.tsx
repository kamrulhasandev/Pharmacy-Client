"use client";
import React, { useEffect, useState } from "react";
import "./layout.css";
import useAdmin from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, isAdminLoading] = useAdmin();
  const router = useRouter();

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
            <li>
              <a href="/dashboard">
                <p>Dashboard Home</p>
              </a>
            </li>
            <li>
              <a href="/dashboard/add-category">
                <p>Add Category</p>
              </a>
            </li>
            <li>
              <a href="/dashboard/all-category">
                <p>All Category</p>
              </a>
            </li>
            <li>
              <a href="/dashboard/add-product">
                <p>Add Product</p>
              </a>
            </li>
            <li>
              <a href="/dashboard/all-product">
                <p>All Product</p>
              </a>
            </li>
            <li>
              <a href="/dashboard/sales-report">
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
