

"use client";

import { useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isAdmin] = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.navbarLogo}>
          <h1>Logo</h1>
        </div>
        <div className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.active : ""}`}>
          <a href="/">Home</a>
          <a href="/all-product">Products</a>
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <a href="/dashboard">Dashboard</a>
              ) : (
                <a href="/my-order">Orders</a>
              )}
              <button className={styles.authButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className={styles.authButton}>
              Login
            </a>
          )}
        </div>
        <button className={styles.toggleMenu} onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>
    </div>
  );
};

export default Navbar;
