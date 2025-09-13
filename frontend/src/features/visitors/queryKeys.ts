export const visitorsKeys = {
  all: ["visitors"] as const,
  detail: (id: string) => [...visitorsKeys.all, "detail", id] as const,
};
