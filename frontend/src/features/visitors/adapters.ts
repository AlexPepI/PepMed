import type { VisitorInput } from "../../types/visitor";

type CreateVisitorRequest = {
  visitor: {
    name: string;
    surname: string;
    birth_date: string;
    gender: "male" | "female" | "other";
    amka: string;
    weight: number;
    height: number;
    smoker: boolean;
    years_smoking: number;
    cig_per_day: number;
    email: string | null;
    phone_number: string | null;
    history: string | null;
  };
  medicines: { id: number; until: string | null }[];
  diseases: { id: number }[];
};

const nullIfEmpty = (s: string | null | undefined) =>
  s && s.trim() !== "" ? s.trim() : null;

const toApiDate = (d: unknown): string => {
  if (!d) return "";
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  const parsed = new Date(d as string);
  return isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
};
const toNum = (v: string | number | null | undefined) => (v ? Number(v) : 0);
const toBool = (s: string) => s === "Yes";
const toGender = (g: string): "male" | "female" | "other" =>
  g === "Male" ? "male" : g === "Female" ? "female" : "other";

export function buildCreateVisitorPayload(v: VisitorInput): CreateVisitorRequest {
  return {
    visitor: {
        name: v.name.trim(),
        surname: v.surname.trim(),
        birth_date: toApiDate(v.birth_date),
        gender: toGender(v.gender),
        amka: v.amka.trim(),
        weight: toNum(v.weight as any),
        height: toNum(v.height as any),
        smoker: toBool(v.smoker as any),
        years_smoking: toNum(v.years_smoking as any),
        cig_per_day: toNum(v.cig_per_day as any),
        email: nullIfEmpty(v.email),
        phone_number: nullIfEmpty(v.phoneNumber),
        history: nullIfEmpty(v.history),
    },
    medicines: (v.medicines ?? []).map(({ id }) => ({ id: Number(id), until: null })),
    diseases: (v.diseases ?? []).map(({ id }) => ({ id: Number(id) })),
  };
}

