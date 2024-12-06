// API RESPONSE
interface IApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
  error?: Error;
}
export const createAPIResponse = <T>({
  status,
  data,
  error,
  message,
}: IApiResponse<T>) => ({
  status,
  data,
  message,
  error,
});
