"use client";

import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, login, logout, user } = useAuth();

  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  const handleLogin = () => {};

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>This is Navbar component</h1>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Navbar;
