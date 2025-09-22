export type IdRef = { id: number };

export type VisitInput = {
  diagnosis: string;
  comments: string;
  reason: string;
  examination: string;
  control: string;
  medicines: IdRef[];
  symptoms: IdRef[];
};

export type CreateVisitPayload = {
  new_visit: {
    diagnosis: string;
    comments: string;
    reason: string;
    examination: string;
    control: string | null;
  };
  symptoms: IdRef[];
  medicines: IdRef[];
};

export type VisitFileRef = { id: number; name?: string | null };

export type VisitDetail = {
  id: number;
  diagnosis: string;
  comments: string;
  reason: string;
  examination: string;
  control: string | null;
  created_at: string;
  files: VisitFileRef[];
  medicines: { id: number; name: string }[];
  symptoms: { id: number; name: string }[];
};
