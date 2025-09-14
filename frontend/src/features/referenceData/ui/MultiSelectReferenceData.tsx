import { MultiSelect } from "@mantine/core";
import { useConstants } from "../hooks/useConstants";
import type { VisitorForm } from "../../visitors/form";

type Kind = "medicine" | "symptom" | "disease";

const fieldByType: Record<Kind, "medicines" | "symptoms" | "diseases"> = {
  medicine: "medicines",
  symptom: "symptoms",
  disease: "diseases",
};

type Props = {
  type: Kind;
  title: string;
  placeholder: string;
  form: VisitorForm;
};

export default function MultiSelectConst({ type, title, placeholder, form }: Props) {
  const { data, refresh } = useConstants(type);
  const field = fieldByType[type];

  const value: string[] =
    (form.values as any)[field]?.map((o: { id: number }) => String(o.id)) ?? [];

  return (
    <MultiSelect
      onDropdownOpen={refresh}
      placeholder={placeholder}
      label={title}
      data={data.map((i) => ({ value: String(i.id), label: i.name }))}
      value={value}
      onChange={(selected) =>
        form.setFieldValue(field, selected.map((id) => ({ id: Number(id) })))
      }
    />
  );
}
