import { MultiSelect } from "@mantine/core";
import { useConstants } from "../hooks/useConstants";

type Kind = "medicine" | "symptom" | "disease";
type IdRef = { id: number };

type Props = {
  type: Kind;
  title: string;
  placeholder: string;
  value: IdRef[];
  onChange: (next: IdRef[]) => void;
};

export default function MultiSelectConst({
  type,
  title,
  placeholder,
  value,
  onChange,
}: Props) {
  const { data = [], refresh } = useConstants(type);

  const selectedIds = value?.map((o) => String(o.id)) ?? [];

  return (
    <MultiSelect
      onDropdownOpen={refresh}
      placeholder={placeholder}
      label={title}
      data={data.map((i) => ({ value: String(i.id), label: i.name }))}
      value={selectedIds}
      onChange={(ids) => onChange(ids.map((id) => ({ id: Number(id) })))}
    />
  );
}
