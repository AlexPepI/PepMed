import { useInfiniteQuery } from "@tanstack/react-query";
import { getVisitors, searchVisitors } from "../api";
import { visitorsKeys } from "../queryKeys";
import type { Visitor } from "../../../types/visitor";

type ModePage =
  | { visitors: Visitor[]; next_cursor: number; has_more: boolean } // infinite mode
  | { visitors: Visitor[]; next_cursor: 0; has_more: false }; // search mode (single page)

export function useVisitorsInfinite(committedSearch: string | null) {
  const isSearching = committedSearch != null && committedSearch.trim() !== "";

  const query = useInfiniteQuery({
    queryKey: visitorsKeys.infinite(
      isSearching ? committedSearch!.trim() : null
    ),
    initialPageParam: 0 as number,
    queryFn: async ({ pageParam }) => {
      if (isSearching) {
        const list = await searchVisitors({ q: committedSearch!.trim() });
        const page: ModePage = {
          visitors: list,
          next_cursor: 0,
          has_more: false,
        };
        return page;
      }
      return getVisitors({ cursor: Number(pageParam) }) as Promise<ModePage>;
    },
    getNextPageParam: (lastPage) =>
      lastPage.has_more ? lastPage.next_cursor : undefined,
  });

  const visitors: Visitor[] = (query.data?.pages ?? []).flatMap(
    (p) => p.visitors
  );

  return {
    visitors,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetching: query.isFetching,
    isPending: query.isPending,
    error: query.error,
    refetch: query.refetch,
    isSearching, // expose mode if you need it
  };
}
