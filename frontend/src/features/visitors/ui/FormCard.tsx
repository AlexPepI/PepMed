import { Button, Group, TextInput } from "@mantine/core";
import type { VisitorForm } from "../form";

type Props = {
  form: VisitorForm;
  nextStep: () => void;
  type: "create" | "update";
};

const VisitorFormCard = ({ form, nextStep }: Props) => (
  <form onSubmit={form.onSubmit(() => nextStep())} className="space-y-4">
    <Group grow>
      <TextInput label="Όνομα" {...form.getInputProps("name")} />
      <TextInput label="Επώνυμο" {...form.getInputProps("surname")} />
    </Group>
    <TextInput label="ΑΜΚΑ" {...form.getInputProps("amka")} />
    <div className='flex justify-center md:justify-end'>
        <Button radius="xl" type="submit">Επόμενο</Button>
    </div>
  </form>
);

export default VisitorFormCard;
