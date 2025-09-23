import { useForm, isNotEmpty } from "@mantine/form";
import type { VisitInput } from "../../types/visit";

export const newVisitInitialValues: VisitInput = {
  diagnosis: "",
  comments: "",
  reason: "",
  examination: "",
  control: "",
  medicines: [],
  symptoms: [],
};

export function buildNewVisitForm(initial: Partial<VisitInput> = {}) {
  return useForm<VisitInput>({
    mode: "controlled",
    initialValues: { ...newVisitInitialValues, ...initial },
    validate: {
      diagnosis: isNotEmpty("Please, fill out this field!"),
      comments: isNotEmpty("Please, fill out this field!"),
      reason: isNotEmpty("Please, fill out this field!"),
      examination: isNotEmpty("Please, fill out this field!"),
    },
  });
}

export type VisitForm = ReturnType<typeof buildNewVisitForm>;
