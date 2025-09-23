import { Divider } from "@mantine/core";
import { useParams, Navigate } from "react-router";
import { useMemo, useState, useRef, useLayoutEffect } from "react";
import { useVisitorDetails } from "../../features/visitors/hooks/useVisitorDetails";
import CardDetails from "../../features/visitors/ui/CardDetails";
import VisitsCard from "../../features/visitors/ui/VisitCard";
import Loading from "../../components/Feedback/Loading";
import DetailsHeader from "../../features/visitors/ui/DetailsHeader";

const VisitorDetailsPage = () => {
  const { id } = useParams();
  const visitorId = useMemo(() => (id ? Number(id) : undefined), [id]);
  const { data, isPending, error } = useVisitorDetails(visitorId);
  const elRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (elRef.current) {
      setHeight(elRef.current.getBoundingClientRect().height);
    }
  }, [data]);
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
      <div className="flex flex-col min-h-[90vh]">
        <DetailsHeader
          name={data.name}
          surname={data.surname}
          amka={data.amka}
        />

        <Divider className="mt-3" />
        <div className="flex flex-col md:flex-row justify-between items-stretch">
          <div className="mt-5 flex w-[100%] md:w-[40%]" ref={elRef}>
            <CardDetails user={data} />
          </div>
          <div className="mt-5 flex w-[100%] md:w-[55%]  min-h-[328px]">
            {!!data.visits?.length && (
              <VisitsCard
                visits={data.visits}
                height={height}
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
