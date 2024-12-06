import { STRIPE_PLAN_NAMES } from "@/config";
import { ApiResponse } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Stripe from "stripe";

type TRequestData = {
  plan: string;
};

type TResponseData = Stripe.Checkout.Session;

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponseData, Error, typeof STRIPE_PLAN_NAMES>({
    mutationFn: async (plan?: typeof STRIPE_PLAN_NAMES) => {
      const res = await axios.post<ApiResponse<TResponseData>>(
        `/stripe/revalidate-transaction?plan=${plan}`
      );

      return res.data.data as TResponseData;
    },
    onSuccess: () => {},
  });

  return mutation;
};
