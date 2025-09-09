import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addConstant, type RefEntity } from '../api';
import { constantsQK } from '../queryKeys';

export function useAddConstant(entity: RefEntity) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => addConstant(entity, name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: constantsQK.list(entity) });
    },
  });
}
