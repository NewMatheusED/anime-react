import axios, { AxiosError, type AxiosInstance } from "axios";

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

function toApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return { message: "Erro inesperado.", details: error };
  }

  const axiosError = error as AxiosError;
  return {
    message: axiosError.message || "Erro na requisição.",
    status: axiosError.response?.status,
    details: axiosError.response?.data,
  };
}

function createHttpClient(): AxiosInstance {
  const client = axios.create({
    baseURL: "https://api.jikan.moe/v4",
    timeout: 15_000,
    headers: {
      Accept: "application/json",
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(toApiError(error))
  );

  return client;
}

export const httpClient = createHttpClient();

