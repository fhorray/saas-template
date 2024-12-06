import { STRIPE_PLAN_NAMES } from "@/config";
import { ApiResponse } from "@/types/common";
import { SelectSubscription } from "@/types/subscription";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Stripe from "stripe";

export const useSubscription = () => {
  const subscription = useQuery<SelectSubscription>({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axios.get<ApiResponse<SelectSubscription>>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription`
      );

      if (res.status !== 200) {
        throw new Error("Error trying to get subscription info");
      }

      return res.data.data;
    },
  });

  const goToCheckout = useMutation({
    mutationFn: async (plan?: (typeof STRIPE_PLAN_NAMES)[number]) => {
      const res = await axios.post<ApiResponse<Stripe.Checkout.Session>>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/checkout?plan=${plan}`
      );

      if (res.status !== 200) {
        throw new Error("Error trying to get subscription info");
      }

      return res.data.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url as string;
    },
  });

  const goToPortal = useMutation({
    mutationFn: async () => {
      const res = await axios.post<ApiResponse<Stripe.BillingPortal.Session>>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/portal?customer=${subscription.data?.customerId}`
      );

      if (res.status !== 200) {
        throw new Error("Error trying to get subscription info");
      }

      return res.data.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url as string;
    },
  });

  return {
    subscription,
    goToCheckout,
    goToPortal,
  };
};
