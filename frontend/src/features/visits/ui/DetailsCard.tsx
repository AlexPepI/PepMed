import { Title, Text, Divider, Paper } from "@mantine/core";
import type { VisitDetail } from "../../../types/visit";
import SymptomsList from "./SymptomsList";
import ExaminationSection from "./ExaminationSection";
import MedicinesList from "./MedicinesList";
import ControlSection from "./ControlSection";

type Props = {
  visit: VisitDetail;
};

const VisitDetailsCard = ({ visit }: Props) => {
  const {
    diagnosis,
    comments,
    reason,
    examination,
    control,
    medicines,
    symptoms,
  } = visit;

  return (
    <div className="flex flex-col w-[90%] h-full gap-3 ml-auto mr-auto">
      <div className="flex justify-center mt-3">
        <Title>{diagnosis}</Title>
      </div>
      <Divider />

      <div className="flex flex-wrap gap-2 justify-between">
        <div className="w-[100%] flex flex-wrap gap-1 md:min-w-[280px]">
          <Text fw={500}>Αιτία Επίσκεψης:</Text> <Text>{reason}</Text>
        </div>
      </div>
      <SymptomsList symptoms={symptoms} />
      <ExaminationSection examination={examination} />
      <ControlSection control={control} />
      <MedicinesList medicines={medicines} />

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
            <Title order={4}>Οδηγίες / Συμπεράσματα</Title>
          </div>
          <Divider />
          <div className="whitespace-pre-line">{comments}</div>
        </Paper>
      </div>
    </div>
  );
};

export default VisitDetailsCard;
