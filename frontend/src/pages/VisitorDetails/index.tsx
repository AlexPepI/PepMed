import { Title, Divider, Loader, Center } from "@mantine/core";
import { useMediaQuery, useElementSize } from "@mantine/hooks";
import { useParams } from "react-router";
import { useMemo } from "react";
import {
  useVisitorDetails,
  getVisitorDetailsError,
} from "../../features/visitors/hooks/useVisitorDetails";
import CardDetails from "../../features/visitors/ui/CardDetails";
import VisitsCard from "../../features/visitors/ui/VisitCard";

const VisitorDetailsPage = () => {
  const { id } = useParams();
  const visitorId = useMemo(() => (id ? Number(id) : undefined), [id]);

  const smallerThanMd = useMediaQuery("(max-width: 768px)");
  const { ref, height } = useElementSize();

  const { data, isPending, error } = useVisitorDetails(visitorId);

  if (isPending) {
    return (
      <Center mih="60vh">
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <>
        <Center mih="60vh">{getVisitorDetailsError(error)}</Center>
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      <div className="flex flex-col min-h-[90vh]">
        <div className="mt-4 flex flex-col gap-4 items-center md:justify-between md:flex-row">
          <Title
            order={1}
            style={{
              fontSize: smallerThanMd ? "1.8rem" : "2.5rem",
              marginLeft: smallerThanMd ? "" : "2rem",
            }}
          >
            {data.name} {data.surname}
          </Title>
          <div className="flex items-center md:mt-3 md:ml-10">
            <Title
              order={3}
              style={{
                fontSize: smallerThanMd ? "1rem" : "",
                marginRight: smallerThanMd ? "" : "2rem",
              }}
            >
              A.M.K.Α : {data.amka}
            </Title>
          </div>
        </div>

        <Divider className="mt-3" />

        <div className="flex flex-col md:flex-row justify-between items-stretch">
          <div ref={ref} className="mt-5 flex w-[100%] md:w-[40%]">
            <CardDetails user={data} />
          </div>
          <div className="mt-5 flex w-[100%] md:w-[55%]">
            {!!data.visits?.length && (
              <VisitsCard
                maxHeight={height || 400}
                visits={data.visits}
                user={{
                  name: data.name,
                  surname: data.surname,
                  amka: data.amka,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitorDetailsPage;
