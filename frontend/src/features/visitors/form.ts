import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import type { VisitorInput } from "../../types/visitor";

export const newVisitorInitialValues: VisitorInput = {
  name: "",
  surname: "",
  birth_date: null,
  gender: "Male",
  amka: "",
  weight: "",
  height: "",
  smoker: "Non-smoker",
  years_smoking: "",
  cig_per_day: "",
  email: "",
  phoneNumber: "",
  history: "",
  medicines: [],
  diseases: [],
};

const normalize = (v: any) => (v == null ? "" : String(v));

export const buildNewVisitorForm = (initial: VisitorInput ) =>
  useForm<VisitorInput>({
    mode: "controlled",
    initialValues: {
      ...initial,
      name: normalize(initial.name),
      surname: normalize(initial.surname),
      amka: normalize(initial.amka),
      weight: normalize(initial.weight),
      height: normalize(initial.height),
      email: normalize(initial.email),
      phoneNumber: normalize(initial.phoneNumber),
      history: normalize(initial.history),
      years_smoking: normalize(initial.years_smoking),
      cig_per_day: normalize(initial.cig_per_day),
    },
    validate: {
      name: isNotEmpty("Please, fill out this field"),
      surname: isNotEmpty("Please, fill out this field"),
      birth_date: isNotEmpty("Please, fill out this field"),

      email: (v) =>
        v.trim() ? isEmail("Provide an email that exists")(v) : null,

      phoneNumber: (v) => {
        if (!v.trim()) return null;
        const len = hasLength(
          { min: 5, max: 20 },
          "Provide a phone number that exists"
        )(v);
        if (len) return len;
        if (!/^\d+$/.test(v.trim())) return "It must be a number";
      },

      amka: (v) => {
        if (!v.trim()) return null;
        const len = hasLength(
          { min: 5, max: 20 },
          "Provide a real personal number"
        )(v);
        if (len) return len;
        if (!/^\d+$/.test(v.trim())) return "It must be a number";
        return null;
      },

      weight: (v) => {
        const filled = isNotEmpty("Please, fill out this field")(v);
        if (filled) return filled;
        if (!/^\d+$/.test(v.trim())) return "It must be a number";
      },

      years_smoking: (v) =>
        v.trim() && !/^\d+$/.test(v.trim()) ? "It must be a number" : null,
      cig_per_day: (v) =>
        v.trim() && !/^\d+$/.test(v.trim()) ? "It must be a number" : null,

      height: (v) => {
        const filled = isNotEmpty("Please, fill out this field")(v);
        if (filled) return filled;
        if (!/^\d+$/.test(v.trim())) return "It must be a number";
      },
    },
  });

export type VisitorForm = ReturnType<typeof buildNewVisitorForm>;
