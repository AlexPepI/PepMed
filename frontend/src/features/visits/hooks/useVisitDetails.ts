import { useQuery } from "@tanstack/react-query";
import { getVisitById } from "../api";
import { getErrorMessage } from "../../../lib/errors";
import { visit as visitKey } from "../queryKeys";

export function useVisitDetails(id: number | undefined) {
  return useQuery({
    queryKey: visitKey(id),
    queryFn: async () => {
      if (!id) throw new Error("Missing visit id");
      return getVisitById(id);
    },
    retry: 1,
    meta: { errorMessage: "Failed to load visit" },
    throwOnError: false,
  });
}

export const getVisitDetailsError = (e: unknown) => getErrorMessage(e);
