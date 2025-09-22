import { Title, Paper, Text } from "@mantine/core";

type Med = { id: number; name: string };

type Props = { medicines: Med[] };

const MedicinesList = ({ medicines }: Props) => {
  if (!medicines?.length) return null;
  return (
    <div className="flex justify-center">
      <Paper
        className="w-[100%] md:w-[70%]"
        radius="md"
        p="md"
        withBorder
        shadow="md"
        bg="dark.7"
      >
        <div className="flex gap-2">
          <Title order={5}>Αγωγή:</Title>
          <div className="flex flex-wrap gap-1">
            {medicines.map((m) => (
              <Text key={m.id}>{m.name}</Text>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default MedicinesList;
