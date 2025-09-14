import { useQuery } from "@tanstack/react-query";
import { fetchConstant, type RefEntity, type RefItem } from "../api";

export function useConstants(entity: RefEntity) {
  const q = useQuery<RefItem[]>({
    queryKey: ["referenceData", entity],
    queryFn: () => fetchConstant(entity),
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: q.data ?? [],
    isLoading: q.isPending,
    error: q.error,
    refresh: () => q.refetch(),
  };
}
