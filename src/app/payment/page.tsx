"use client";
import { useOpenTransactionMutation } from "@/api/transaction/transaction";
import { useState } from "react";

const Checkout: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentDescription, setPaymentDescription] = useState("");
  const { mutate: makePayment } = useOpenTransactionMutation();

  const handlePayment = () => {
    const paymentData = {
      amount,
      customerName,
      customerEmail,
      paymentReference:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      paymentDescription,
      currencyCode: "NGN",
      contractCode: "4711005010",
      redirectUrl: "http://localhost:3000/confirmation",
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
    };

    console.log("Initiating payment with data:", paymentData);
    // Add integration logic here, e.g., calling a payment API or SDK
    makePayment(paymentData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Checkout</h1>
      <div className="mb-4">
        <label>
          Customer Name:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mb-4 bg-gray-300 text-black"
          />
        </label>
      </div>
      <div>
        <label>
          Customer Email:
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="mb-4 bg-gray-300 text-black"
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="mb-4 bg-gray-300 text-black"
          />
        </label>
      </div>
      <div>
        <label>
          Payment Description:
          <input
            type="text"
            value={paymentDescription}
            onChange={(e) => setPaymentDescription(e.target.value)}
            className="mb-4 bg-gray-300 text-black"
          />
        </label>
      </div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;
