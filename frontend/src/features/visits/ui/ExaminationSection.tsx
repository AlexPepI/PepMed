import { Title, Divider, Paper } from "@mantine/core";

type Props = { examination: string };

const ExaminationSection = ({ examination }: Props) => (
  <div className="flex justify-center">
    <Paper className="w-[100%] md:w-[70%]" radius="md" p="md" withBorder shadow="md" bg="dark.7">
      <div className="flex justify-center">
        <Title order={4}>Κλινική Εξέταση</Title>
      </div>
      <Divider />
      {examination || "—"}
    </Paper>
  </div>
);

export default ExaminationSection;
