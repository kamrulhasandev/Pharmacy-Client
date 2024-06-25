"use client";
import React, { useState } from "react";
import "./layout.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
              <a href="/dashboard/users">
                <p>Users Management</p>
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
