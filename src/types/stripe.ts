import { Currency } from "./common";

export type TSelectProduct = {
  productId: string;
  productName: string;
  productDescription: string | null;
  productImages: string[];
  priceId: string;
  priceAmount: string;
  currency: Currency;
  recurring: "month" | "year" | null;
  productActive: boolean;
  productType: "service" | "physical" | "subscription";
  recurringInterval: "month" | "year" | null;
  priceTrialPeriod: number | null;
};
