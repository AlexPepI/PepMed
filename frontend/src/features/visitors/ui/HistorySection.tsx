import { Paper, Text, Divider } from "@mantine/core";

type Props = { history: string | null };

const HistorySection = ({ history }: Props) => {
  if (!history) return null;

  return (
    <Paper radius="md" p="md" withBorder shadow="md" bg="dark.7">
      <div>
        <Text className="flex justify-center">
          <strong>Notes</strong>
        </Text>
        <Divider />
        <Text className="flex flex-wrap whitespace-pre-line">{history}</Text>
      </div>
    </Paper>
  );
};

export default HistorySection;
