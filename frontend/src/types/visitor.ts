export type VisitorInput = {
  name: string;
  surname: string;
  birth_date: Date | null;
  gender: string;
  amka: string;
  weight: string;
  height: string;
  smoker: string;
  years_smoking: string;
  cig_per_day: string;
  email: string;
  phoneNumber: string;
  history: string;
  medicines: any[];
  diseases: any[];
};

export type Visitor = {
  id: number;
  name: string;
  surname: string;
  amka: string;
  latest_visit: string | null;
};

export type VisitorsHomePage = {
  visitors: Visitor[];
  next_cursor: number;
  has_more: boolean;
};

export type VisitSummary = {
  id: number | null;
  diagnosis: string | null;
  created_at: string | null;
};

export type DiseaseRef = { id: number; name: string };
export type MedicineLink = { medicine: { id: number; name: string }; until: string | null };

export interface VisitorDetail {
  id: number | null;
  name: string | null;
  surname: string | null;
  amka: string | null;
  birth_date: string | null;
  gender: "male" | "female" | "other" | null;
  email: string | null;
  phone_number: string | null;
  smoker: "smoker" | "non_smoker" | "ex_smoker";
  years_smoking: number | null;
  cig_per_day: number | null;
  height: number | null;
  weight: number | null;
  history: string | null;
  diseases: DiseaseRef[];
  medicines_links: MedicineLink[];
  visits: VisitSummary[];
}