import { useEffect,useState,useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { buildNewVisitForm } from '../../features/visits/form';
import FormCard from '../../features/visits/ui/FormCard';
import { useAddVisit } from '../../features/visits/hooks/useAddVisit';
import { uploadFiles } from '../../features/visits/uploadFiles';
import type { Queued } from '../../features/visits/ui/FilesBox';

type LocationState = { visitor?: { id: number; name: string; surname: string } };

export default function NewVisitPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const visitor = state.visitor;

  useEffect(() => {
    if (!visitor || !id) navigate('/');
  }, [visitor, id, navigate]);

  const form = buildNewVisitForm();
  const [files, setFiles] = useState<Queued[]>([]);
  const { add, isLoading, error } = useAddVisit();
  const submittingRef = useRef(false);

  const onSubmit = async () => {
    if (!id || !visitor) return;
    if (submittingRef.current) return;
    submittingRef.current = true;
    try {
      const created = await add({ visitorId: Number(id), input: form.values });
      const visitId: number | undefined = created?.id ?? created?.data?.id;
      if (visitId && files.length > 0) {
        await uploadFiles(visitId, files.map(f => f.file));
        files.forEach(f => URL.revokeObjectURL(f.url));
        setFiles([]);}
        navigate('/');
    } catch {
    } 
  };

  if (!visitor || !id) return null;

  return (
    <FormCard
      form={form}
      visitor={visitor}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      files={files}
      setFiles={setFiles}
    />
  );
}
