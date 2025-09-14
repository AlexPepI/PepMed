import type { AxiosError } from "axios";

export function getErrorMessage(err: unknown): string {
  if (!err) return "";
  if (typeof err === "string") return err;
  if (err instanceof Error) {
    const axiosErr = err as AxiosError<any>;
    if (axiosErr.response?.data) {
      if (axiosErr.response.data.detail) return axiosErr.response.data.detail;
      return JSON.stringify(axiosErr.response.data);
    }
    return err.message;
  }
  return String(err);
}
