import { Paper, Title, Text, Divider } from "@mantine/core";
import { useNavigate } from "react-router";

type Props = {
  id: number | null;
  diagnosis: string | null;
  created_at: string | null;
  user: {
    name: string | null;
    surname: string | null;
    amka: string | null;
  };
};

const PaperComponentVisit = ({ id, diagnosis, created_at, user }: Props) => {
  const createdText = created_at
    ? new Date(created_at).toLocaleString("el-GR")
    : "—";
  const navigate = useNavigate();

  return (
    <Paper
      onClick={() => navigate(`/visit-details/${id}`, { state: user })}
      className="min-w-[200px] h-full cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
      radius="md"
      p="md"
      withBorder
      shadow="md"
      bg="dark.7"
    >
      <div className="h-[100%] flex flex-col">
        <div className="flex justify-center">
          <Title order={4}>{diagnosis}</Title>
        </div>
        <Divider />
        <div className="flex justify-end mt-auto">
          <Text c="dimmed" size="sm">
            {createdText}
          </Text>
        </div>
      </div>
    </Paper>
  );
};

export default PaperComponentVisit;
