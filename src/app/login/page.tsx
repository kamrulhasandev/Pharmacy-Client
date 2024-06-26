"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./style.css";
import { AuthContext, AuthInfo } from "@/context/AuthProvider";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login, googleLogin }: AuthInfo = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const axiosPublic = useAxiosPublic();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;
      await axiosPublic.post("/user/save-user", {
        email: user.email,
      });
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
    console.log(email, password);
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await googleLogin();
      const user = userCredential.user;

      await axiosPublic.post("/user/save-user", {
        email: user.email,
      });

      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
   <div className="login-container">
     <div className="login-page">
      <h3>Login your account</h3>
      <form className="login-form" onSubmit={handleEmailLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>

      <div className="google-login-section">
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      </div>

      <div className="register-link">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register">Register here</Link>
        </p>
      </div>
    </div>
   </div>
  );
};

export default LoginPage;
