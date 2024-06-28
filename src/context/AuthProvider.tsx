"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
  GoogleAuthProvider,
  Unsubscribe,
} from "firebase/auth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { auth } from "@/firebase/firebase.config";

export interface AuthInfo {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  setLoading: (value: boolean) => void;
}

export const AuthContext = createContext<AuthInfo>({
  user: null,
  loading: true,
  isAuthenticated: false,
  createUser: () => Promise.reject("AuthProvider not initialized"),
  login: () => Promise.reject("AuthProvider not initialized"),
  googleLogin: () => Promise.reject("AuthProvider not initialized"),
  logout: () => Promise.reject("AuthProvider not initialized"),
  setLoading: () => {},
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const axiosPublic = useAxiosPublic();
  const queryClient = new QueryClient();

  const createUser = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const userInfo = { email: currentUser.email };
          try {
            const res = await axiosPublic.post("/jwt", userInfo);

            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            } else {
              console.error("Token not found in response:", res.data);
            }
          } catch (error) {
            console.error("Error fetching token:", error);
          }
        } else {
          localStorage.removeItem("access-token");
        }
        setIsAuthenticated(!!currentUser);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo: AuthInfo = {
    user,
    loading,
    isAuthenticated,
    createUser,
    login,
    googleLogin,
    logout,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
