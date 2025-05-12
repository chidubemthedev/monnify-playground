"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ConfirmationPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful!</h1>
      <p>
        Thank you for your payment. Your transaction was completed successfully.
      </p>
      <button
        onClick={handleGoHome}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ConfirmationPage;
