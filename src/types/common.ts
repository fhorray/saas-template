export type ApiResponse<T> = {
  data: T;
  status: "success" | "error";
  message?: string;
};

// Tipo para Locales
export type Locale = "pt-BR" | "en-US" | "es-ES" | "fr-FR" | "de-DE";

// Tipo para Moedas
export type Currency = "BRL" | "USD" | "EUR" | "GBP" | "JPY";
