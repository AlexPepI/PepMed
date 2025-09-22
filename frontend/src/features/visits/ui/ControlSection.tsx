import { Title, Divider, Paper } from "@mantine/core";

type Props = { control: string | null };

const ControlSection = ({ control }: Props) => {
  if (!control) return null;
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
        <div className="flex justify-center">
          <Title order={4}>Εργαστηριακός Έλεγχος</Title>
        </div>
        <Divider />
        <div className="whitespace-pre-line">{control}</div>
      </Paper>
    </div>
  );
};

export default ControlSection;
