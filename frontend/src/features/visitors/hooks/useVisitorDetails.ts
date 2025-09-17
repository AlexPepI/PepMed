import { useQuery } from "@tanstack/react-query";
import { getVisitorById } from "../api";
import { getErrorMessage } from "../../../lib/errors";

export function useVisitorDetails(id: number | undefined) {
  return useQuery({
    queryKey: ["visitor", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing visitor id");
      return getVisitorById(id);
    },
    retry: 1,
    select: (data) => data,
    throwOnError: false,
    meta: { errorMessage: "Failed to load visitor" },
  });
}

export function getVisitorDetailsError(err: unknown) {
  return getErrorMessage(err);
}
