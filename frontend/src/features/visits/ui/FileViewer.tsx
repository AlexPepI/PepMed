import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { deleteFile, getFileBlob } from "../api";
import { getErrorMessage } from "../../../lib/errors";
import type { VisitDetail } from "../../../types/visit";
import PdfFrame from "./PdfFrame";
import FilePager from "./FilePager";

type Props = { visit: VisitDetail };

const FileViewer = ({ visit }: Props) => {
  const files = visit.files ?? [];
  const [index, setIndex] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const navigate = useNavigate();

  const current = useMemo(() => files?.[index], [files, index]);

  useEffect(() => {
    if (index >= files.length) setIndex(0);
  }, [files, index]);

  useEffect(() => {
    let objectUrl: string | null = null;
    let aborted = false;

    (async () => {
      if (!current) {
        setPdfUrl("");
        return;
      }
      try {
        const blob = await getFileBlob(current.id);
        if (aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch {
        setPdfUrl("");
      }
    })();

    return () => {
      aborted = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [current]);

  const hasPrev = index > 0;
  const hasNext = index < files.length - 1;

  const handleDelete = async () => {
    if (!current) return;
    try {
      await deleteFile(current.id);
      navigate(0);
    } catch (e) {
      console.error(getErrorMessage(e));
    }
  };

  if (!files.length) return null;

  return (
    <>
      <PdfFrame src={pdfUrl} />
      <FilePager
        index={index}
        total={files.length}
        onPrev={() => setIndex((i) => Math.max(0, i - 1))}
        onNext={() => setIndex((i) => Math.min(files.length - 1, i + 1))}
        onDelete={handleDelete}
        disablePrev={!hasPrev}
        disableNext={!hasNext}
        visitId={visit.id}
        showDelete
      />
    </>
  );
};

export default FileViewer;
