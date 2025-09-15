import { useMutation } from '@tanstack/react-query';
import type { VisitInput } from '../../../types/visit';
import { buildCreateVisitPayload, createVisit } from '../api';

type Vars = { visitorId: number; input: VisitInput };

export function useAddVisit() {
  const m = useMutation({
    mutationFn: async ({ visitorId, input }: Vars) => {
      const payload = buildCreateVisitPayload(input);
      return createVisit(visitorId, payload);
    },
  });

  return {
    add: (vars: Vars) => m.mutateAsync(vars),
    isLoading: m.isPending,
    error: m.error,
  };
}
