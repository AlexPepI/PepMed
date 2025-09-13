import { useMutation } from "@tanstack/react-query";
import { createVisitor } from "../api";
import type { VisitorInput } from "../../../types/visitor";

export const useAddVisitor = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (p: VisitorInput) => createVisitor(p),
  });
  return { add: mutateAsync, isLoading: isPending, error };
};
