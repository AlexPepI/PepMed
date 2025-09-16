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
