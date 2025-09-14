import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import type { VisitorInput } from "../../types/visitor";

export const newVisitorInitialValues: VisitorInput = {
  name: "",
  surname: "",
  birth_date: null,
  gender: "Άνδρας",
  amka: "",
  weight: "",
  height: "",
  smoker: "No",
  years_smoking: "",
  cig_per_day: "",
  email: "",
  phoneNumber: "",
  history: "",
  medicines: [],
  diseases: [],
};

export const buildNewVisitorForm = (initial: VisitorInput) =>
  useForm<VisitorInput>({
    mode: "controlled",
    initialValues: initial,
    validate: {
      name: isNotEmpty("Please, fill out this field"),
      surname: isNotEmpty("Please, fill out this field"),
      birth_date: isNotEmpty("Please, fill out this field"),

      email: (v) => (v.trim() ? isEmail("Provide an email that exists")(v) : null),

      phoneNumber: (v) => {
        if (!v.trim()) return null;
        const len = hasLength({ min: 10, max: 10 }, "Provide a phone number that exists")(v);
        if (len) return len;
        if (!/^\d+$/.test(v.trim())) return "It must be a number";
      },

      amka: hasLength({ min: 11, max: 11 }, "Provide a real personal number"),

      weight: (v) => {
        const filled = isNotEmpty("Please, fill out this field")(v);
        if (filled) return filled;
        if (!/^\d+$/.test(v.trim())) return "It must be a number";
      },

      years_smoking: (v) => (v.trim() && !/^\d+$/.test(v.trim()) ? "It must be a number" : null),
      cig_per_day: (v) => (v.trim() && !/^\d+$/.test(v.trim()) ? "It must be a number" : null),

      height: (v) => {
        const filled = isNotEmpty("Please, fill out this field")(v);
        if (filled) return filled;
        if (!/^\d+$/.test(v.trim())) return "It must be a number";
      },
    },
  });
export type VisitorForm = ReturnType<typeof buildNewVisitorForm>;