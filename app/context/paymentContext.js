"use client";
import { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  return (
    <PaymentContext.Provider value={{ paymentform, setPaymentform }}>
      {children}
    </PaymentContext.Provider>
  );
};

// custom hook for easier use
export const usePayment = () => useContext(PaymentContext);
