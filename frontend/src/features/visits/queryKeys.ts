export const visitKeys = {
  all: ['visits'] as const,
};

export const visit = (id: number | undefined) => ["visit", id] as const;