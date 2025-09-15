import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { buildNewVisitForm } from '../../features/visits/form';
import FormCard from '../../features/visits/ui/FormCard';
import { useAddVisit } from '../../features/visits/hooks/useAddVisit';

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
  const { add, isLoading, error } = useAddVisit();

  const onSubmit = async () => {
    if (!id || !visitor) return;
    try {
      await add({ visitorId: Number(id), input: form.values });
      navigate('/');
    } catch {
      // error shown via FormCard
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
    />
  );
}
