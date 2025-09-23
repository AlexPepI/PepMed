import { Title, Paper, Text } from "@mantine/core";

type Symptom = { id: number; name: string };

type Props = { symptoms: Symptom[] };

const SymptomsList = ({ symptoms }: Props) => {
  if (!symptoms?.length) return null;
  return (
    <div className="flex justify-center border-1">
      <Paper
        className="w-[100%] "
        radius="md"
        p="md"
        withBorder
        shadow="md"
        bg="dark.7"
      >
        <div className="flex gap-2">
          <Title order={5}>Symptoms:</Title>
          <div className="flex flex-wrap gap-1">
            {symptoms.map((s) => (
              <Text key={s.id}>{s.name}</Text>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default SymptomsList;
