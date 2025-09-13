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
  smoker: "Όχι",
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
      name: isNotEmpty("Πρέπει να συμπληρωθεί!"),
      surname: isNotEmpty("Πρέπει να συμπληρωθεί!"),
      birth_date: isNotEmpty("Πρέπει να συμπληρωθεί!"),
      email: (value: string) => {
        if (value.trim() === "") return null;
        return isEmail("Προσθέστε αληθινό Email!")(value);
      },
      phoneNumber: (value: string) => {
        if (value.trim() === "") return null;
        const lengthError = hasLength(
          { min: 10, max: 10 },
          "Προσθέστε αληθινό κινητό τηλέφωνο!"
        )(value);
        if (lengthError) return lengthError;
        if (!/^\d+$/.test(value.trim())) return "Επιτρέπονται μόνο αριθμοί";
      },
      amka: hasLength({ min: 11, max: 11 }, "Προσθέστε αληθινό Α.Μ.Κ.Α"),
      weight: (value: string) => {
        const filled = isNotEmpty("Πρέπει να συμπληρωθεί!")(value);
        if (filled) return filled;
        if (!/^\d+$/.test(value.trim())) return "Επιτρέπονται μόνο αριθμοί";
      },
      years_smoking: (value: string) => {
        if (value.trim() === "") return null;
        if (!/^\d+$/.test(value.trim())) return "Επιτρέπονται μόνο αριθμοί";
      },
      cig_per_day: (value: string) => {
        if (value.trim() === "") return null;
        if (!/^\d+$/.test(value.trim())) return "Επιτρέπονται μόνο αριθμοί";
      },
      height: (value: string) => {
        const filled = isNotEmpty("Πρέπει να συμπληρωθεί!")(value);
        if (filled) return filled;
        if (!/^\d+$/.test(value.trim())) return "Επιτρέπονται μόνο αριθμοί";
      },
    },
  });

export type VisitorForm = ReturnType<typeof buildNewVisitorForm>;
