import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteConstant, type RefEntity } from '../api';
import { constantsQK } from '../queryKeys';

export function useDelete(entity: RefEntity) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteConstant(entity, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: constantsQK.list(entity) });
    },
  });

  return mutation;
}