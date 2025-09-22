export const visitorsKeys = {
  all: ["visitors"] as const,
  detail: (id: string) => [...visitorsKeys.all, "detail", id] as const,
  infinite: (q: string | null) =>
    [...visitorsKeys.all, "infinite", q ?? ""] as const,
};
