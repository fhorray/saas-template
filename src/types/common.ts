import { ROLE_LIST } from "@/config";

// type for Api Response
export type ApiResponse<T> = {
  data: T;
  status: "success" | "error";
  message?: string;
};

// Type for locale
export type Locale = "pt-BR" | "en-US" | "es-ES" | "fr-FR" | "de-DE";

// Type for currencies
export type Currency = "BRL" | "USD" | "EUR" | "GBP" | "JPY";

// Route Config
export type RouteConfig = {
  path: RegExp;
  auth: boolean;
  roles?: (typeof ROLE_LIST)[number][];
};
