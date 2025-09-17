import { Card } from "@mantine/core";
import BasicInfoRows from "./BasicInfo";
import HistorySection from "./HistorySection";
import ListsSection from "./ListSection";

type Props = {
  user: import("../../../types/visitor").VisitorDetail;
};

const VisitorCardDetails = ({ user }: Props) => {

  return (
    <Card className="w-[100%] md:w-[76%] min-w-[290px] m-auto flex gap-4" shadow="sm" padding="lg" radius="md" withBorder>
      <BasicInfoRows
        birth_date={user.birth_date}
        gender={user.gender}
        smoker={user.smoker}
        weight={user.weight}
        height={user.height}
        years_smoking={user.years_smoking}
        cig_per_day={user.cig_per_day}
      />
      {user.history && (
        <HistorySection history={user.history} />
      )}
      <ListsSection medicines={user.medicines_links} diseases={user.diseases} />
    </Card>
  );
};

export default VisitorCardDetails;
