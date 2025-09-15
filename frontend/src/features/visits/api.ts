import { api } from '../../lib/api';
import type { CreateVisitPayload, VisitInput } from '../../types/visit';

export function buildCreateVisitPayload(v: VisitInput): CreateVisitPayload {
  const trim = (s: string) => s.trim();
  return {
    new_visit: {
      diagnosis: trim(v.diagnosis),
      comments: trim(v.comments),
      reason: trim(v.reason),
      examination: trim(v.examination),
      control: v.control && v.control.trim() !== '' ? trim(v.control) : null,
    },
    symptoms: v.symptoms.map(x => ({ id: Number(x.id) })),
    medicines: v.medicines.map(x => ({ id: Number(x.id) })),
  };
}

export async function createVisit(visitorId: number, payload: CreateVisitPayload) {
  const { data } = await api.post('/visit/', payload, {
    params: { visitor_id: visitorId },
  });
  return data;
}
