import { Card, ScrollArea } from "@mantine/core";
import PaperComponentVisit from "./PaperComponentVisit";

type Visit = {
  id: number | null;
  diagnosis: string | null;
  created_at: string | null;
};

type Props = {
  visits: Visit[];
  maxHeight: number;
  user: {
    name: string | null;
    surname: string | null;
    amka: string | null;
  };
};

const VisitorVisitsCard = ({ visits, maxHeight, user }: Props) => {
  return (
    <Card
      className="flex flex-col w-[100%] h-[90%] md:w-[97%] m-auto"
      style={{ height: `${maxHeight}px` }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <div className="flex justify-center">
        <ScrollArea.Autosize className="flex-1" h={maxHeight} type="scroll" offsetScrollbars>
          <div className="grid gap-4 w-[90%] items-stretch grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {visits.map((v) => (
              <div key={v.id ?? Math.random()}>
                <PaperComponentVisit id={v.id} diagnosis={v.diagnosis} created_at={v.created_at} user={user} />
              </div>
            ))}
          </div>
        </ScrollArea.Autosize>
      </div>
    </Card>
  );
};

export default VisitorVisitsCard;
