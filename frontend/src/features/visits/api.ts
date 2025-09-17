import { api } from '../../lib/api';
import type { CreateVisitPayload, VisitInput,VisitDetail } from '../../types/visit';

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

export async function getVisitById(id: number): Promise<VisitDetail> {
  const { data } = await api.get(`/api/visit/${id}`);
  return data as VisitDetail;
}

export async function getFileBlob(fileId: number): Promise<Blob> {
  const { data } = await api.get(`/api/files/${fileId}`, { responseType: "blob" });
  return data as Blob;
}

export async function deleteFile(fileId: number): Promise<void> {
  await api.delete(`/api/files/${fileId}`);
}