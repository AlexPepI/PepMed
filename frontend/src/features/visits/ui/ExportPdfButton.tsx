import { Button } from "@mantine/core";
import { getErrorMessage } from "../../../lib/errors";
import { useExportVisitPdf } from "../hooks/useExportVisitPdf";

type Props = { visitId: number };

function getFilename(cd?: string, fallback = "visit.pdf") {
  if (!cd) return fallback;
  const m = /filename\*?=(?:UTF-8''|")?([^\";]+)/i.exec(cd);
  return decodeURIComponent((m?.[1] || fallback).replace(/"/g, ""));
}

export default function ExportPdfButton({ visitId }: Props) {
  const { mutateAsync, isPending } = useExportVisitPdf();

  const handleClick = async () => {
    try {
      const res = await mutateAsync(visitId); // AxiosResponse<Blob>
      const filename = getFilename(
        res.headers?.["content-disposition"],
        `visit_${visitId}.pdf`
      );
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || `visit_${visitId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  return (
    <Button onClick={handleClick} loading={isPending} disabled={isPending}>
      Export PDF
    </Button>
  );
}
