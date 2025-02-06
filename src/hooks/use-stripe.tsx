import { ApiResponse } from "@/types/common";
import { TSelectProduct } from "@/types/stripe";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStripe = () => {
  const productsList = useQuery<TSelectProduct[]>({
    queryKey: ["stripe_products"],
    queryFn: async () => {
      const res = await axios.get<ApiResponse<TSelectProduct[]>>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/products`
      );

      if (res.status !== 200) {
        throw new Error("Error trying to get stripe products list");
      }

      return res.data.data;
    },
  });

  return {
    products: {
      list: productsList,
    },
  };
};
