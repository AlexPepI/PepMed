import { useMutation } from "@tanstack/react-query";
import { exportVisitPdf } from "../api";

export function useExportVisitPdf() {
  return useMutation({
    mutationFn: (visitId: number) => exportVisitPdf(visitId),
  });
}
