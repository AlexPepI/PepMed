import { useState, useCallback } from "react";
import type { VisitInput } from "../../../types/visit";
import { updateVisit } from "../api";
import { getErrorMessage } from "../../../lib/errors";

export function useUpdateVisit(id: number) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(
    async (data: VisitInput) => {
      setLoading(true);
      setError(null);
      try {
        return await updateVisit(id, data);
      } catch (e) {
        const msg = getErrorMessage(e);
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  return { update, isLoading, error };
}
