import { Title, Divider, Paper } from "@mantine/core";

type Props = { examination: string };

const ExaminationSection = ({ examination }: Props) => (
  <div className="flex justify-center">
    <Paper
      className="w-[100%]"
      radius="md"
      p="md"
      withBorder
      shadow="md"
      bg="dark.7"
    >
      <div className="flex justify-center">
        <Title order={4}>Clinical Examination</Title>
      </div>
      <Divider />
      <div className="whitespace-pre-line">{examination || "—"}</div>
    </Paper>
  </div>
);

export default ExaminationSection;
