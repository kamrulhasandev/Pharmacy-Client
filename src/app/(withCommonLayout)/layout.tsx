import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer/>
    </div>
  );
};

export default CommonLayout;
