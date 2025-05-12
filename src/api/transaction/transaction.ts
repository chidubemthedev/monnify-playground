import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const openTransaction = async (data: {
  amount: number;
  currency: string;
  customerEmail: string;
  paymentMethod: string;
}): Promise<any> => {
  const response = await axiosInstance.post<any>(
    "/api/v1/merchant/transactions/init-transaction",
    data
  );
  return response.data;
};

export const useOpenTransactionMutation = () => {
  return useMutation<
    any,
    Error,
    {
      amount: number;
      currency: string;
      customerEmail: string;
      paymentMethod: string;
    }
  >({
    mutationFn: openTransaction,
    onSuccess: (data) => {
      // onsuccess, redirect to response.checkoutUrl
      const checkoutUrl = data.responseBody.checkoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    },
  });
};
