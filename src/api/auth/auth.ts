import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

// 1. Login Mutation
const login = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  const response = await axiosInstance.post<any>("/api/v1/auth/login", data);
  return response.data;
};

export const useLoginMutation = (): UseMutationResult<
  any,
  Error,
  { email: string; password: string }
> => {
  return useMutation<any, Error, { email: string; password: string }>({
    mutationFn: login,
    onSuccess: (data) => {
      const accessToken = data.responseBody.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
    },
  });
};
