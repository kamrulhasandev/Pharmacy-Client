"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthContext, AuthInfo } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import "./style.css";
import useAxiosPublic from "@/hooks/useAxiosPublic";

interface RegisterFormData {
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { createUser, googleLogin }: AuthInfo = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;

      // Save user data using Axios
      await axiosPublic.post("/user/save-user", {
        email: user.email,
      });
      router.push("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      setError("email", { message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await googleLogin();
      const user = userCredential.user;

      // Save user data using Axios
      await axiosPublic.post("/user/save-user", {
        email: user.email
      });
      router.push("/");
    } catch (error: any) {
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="login-page">
      <h3>Registration</h3>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>

      <div className="social-login-section">
      <div className="google-login-section">
        <button onClick={handleGoogleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
      </div>

      <div className="register-div">
      <div className="register-link">
        <p>
          Already have an account? <Link href="/login">Login Here</Link>
        </p>
      </div>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
