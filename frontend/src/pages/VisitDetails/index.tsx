import { Title, Divider, Center, Card, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation, useParams } from "react-router";
import { useMemo } from "react";
import {
  useVisitDetails,
  getVisitDetailsError,
} from "../../features/visits/hooks/useVisitDetails";
import VisitDetailsCard from "../../features/visits/ui/DetailsCard";
import FileViewer from "../../features/visits/ui/FileViewer";
import FileUploadModal from "../../features/visits/ui/FileUploadModal";
import UpdateVisitButton from "../../features/visits/ui/ButtonUpdate";
import ExportPdfButton from "../../features/visits/ui/ExportPdfButton";
import Loading from "../../components/Feedback/Loading";

type HeaderState = { name: string; surname: string; amka: string };

const VisitDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const visitor = (location.state || {}) as HeaderState;
  const visitId = useMemo(() => (id ? Number(id) : undefined), [id]);

  const smallerThanMd = useMediaQuery("(max-width: 768px)");
  const { data, isPending, error } = useVisitDetails(visitId);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Center mih="60vh">{getVisitDetailsError(error)}</Center>
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      <div className="mt-4 flex flex-col gap-4 items-center md:justify-between md:flex-row">
        <Title
          order={1}
          style={{
            fontSize: smallerThanMd ? "1.8rem" : "2.5rem",
            marginLeft: smallerThanMd ? "" : "2rem",
          }}
        >
          {visitor.name} {visitor.surname}
        </Title>
        <div className="flex items-center md:mt-3 md:ml-10">
          <Title
            order={3}
            style={{
              fontSize: smallerThanMd ? "1rem" : "",
              marginRight: smallerThanMd ? "" : "2rem",
            }}
          >
            A.M.K.Α : {visitor.amka}
          </Title>
        </div>
      </div>

      <Divider className="mt-3" />

      <div className="flex justify-center md:justify-normal md:ml-3">
        <Text fw={500} c="dimmed">
          Επίσκεψη : {new Date(data.created_at).toLocaleString("el-GR")}
        </Text>
      </div>
      <div className="w-full flex justify-center mt-6">
        {data.files.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-[90%]">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <VisitDetailsCard visit={data} />
              <UpdateVisitButton visitor={visitor} visit={data} />
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <FileViewer visit={data} />
              <div className="flex justify-end mb-3">
                <FileUploadModal visitId={data.id} />
                <ExportPdfButton visitId={Number(visitId)} />
              </div>
            </Card>
          </div>
        ) : (
          <Card
            className="w-full md:w-[60%]"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <VisitDetailsCard visit={data} />
            <div className="flex justify-end mb-3">
              <FileUploadModal visitId={data.id} />
              <UpdateVisitButton visitor={visitor} visit={data} />
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default VisitDetailsPage;
