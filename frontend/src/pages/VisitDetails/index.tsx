import { Divider, Card, Text } from "@mantine/core";
import { useLocation, useParams, Navigate } from "react-router";
import { useMemo } from "react";
import { useVisitDetails } from "../../features/visits/hooks/useVisitDetails";
import VisitDetailsCard from "../../features/visits/ui/DetailsCard";
import FileViewer from "../../features/visits/ui/FileViewer";
import Loading from "../../components/Feedback/Loading";
import DetailsHeader from "../../features/visitors/ui/DetailsHeader";

type HeaderState = { name: string; surname: string; amka: string };

const VisitDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const visitor = (location.state || {}) as HeaderState;
  const visitId = useMemo(() => (id ? Number(id) : undefined), [id]);
  const { data, isPending, error } = useVisitDetails(visitId);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Navigate to={"/"} />
      </>
    );
  }

  return (
    <>
      <DetailsHeader
        name={visitor.name}
        surname={visitor.surname}
        amka={visitor.amka}
      />
      <Divider className="mt-3" />
      <div className="flex justify-center md:justify-normal md:ml-3">
        <Text fw={500} c="dimmed">
          Visit : {new Date(data.created_at).toLocaleString("el-GR")}
        </Text>
      </div>
      <div className="w-full flex justify-center mt-6">
        <div className="w-[90%] flex flex-col md:flex-row justify-between gap-4">
          <div
            className={`min-w-[300px] h-full ${
              data.files.length > 0
                ? "w-full md:w-[40%]"
                : "w-full md:w-[60%] mx-auto"
            }`}
          >
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="h-full"
            >
              <VisitDetailsCard visit={data} visitor={visitor} />
            </Card>
          </div>

          {data.files.length > 0 && (
            <div className="w-full md:w-[55%] min-w-[300px] h-full">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <FileViewer visit={data} />
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VisitDetailsPage;
