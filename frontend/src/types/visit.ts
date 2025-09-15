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
