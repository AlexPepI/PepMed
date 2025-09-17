import { useState, useCallback } from "react";
import { updateVisitor } from "../api";
import type { VisitorInput } from "../../../types/visitor";
import { getErrorMessage } from "../../../lib/errors";

export function useUpdateVisitor(id: number) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (data: VisitorInput) => {
    setLoading(true);
    setError(null);
    try {
      return await updateVisitor(id, data);
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { update, isLoading, error };
}
