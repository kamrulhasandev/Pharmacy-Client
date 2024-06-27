"use client";

import { useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isAdmin] = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
console.log(isAdmin)
  const handleLogout: any = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <h1>Logo</h1>
        </div>
        <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="profile">
              <span onClick={toggleProfileDropdown}>Profile</span>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  {isAdmin ? (
                    <>
                      <a href="/dashboard">Dashboard</a>
                      <button onClick={handleLogout}>Logout</button>
                    </>
                  ) : (
                    <>
                      <a href="/my-order">My Orders</a>
                      <a href="#my-profile">My Profile</a>
                      <button onClick={handleLogout}>Logout</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <a href="/login">Login</a>
          )}
          <button className="toggle-menu" onClick={toggleMobileMenu}>
            ☰
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
