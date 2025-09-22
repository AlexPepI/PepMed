import { useLocation, useNavigate, useParams } from "react-router";
import { useForm, isNotEmpty } from "@mantine/form";
import FormCard from "../../features/visits/ui/FormCard";
import { useUpdateVisit } from "../../features/visits/hooks/useUpdateVisits";
import type { VisitInput } from "../../types/visit";

type State = Partial<VisitInput> & {
  name: string;
  surname: string;
  amka?: string;
};

export default function VisitUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as { state: State };

  const s = location.state;

  const initial: VisitInput = {
    reason: String(s?.reason),
    examination: String(s?.examination),
    control: String(s?.control ?? "-"),
    diagnosis: String(s?.diagnosis),
    comments: String(s?.comments),
    medicines: (s?.medicines ?? []).map(({ id }) => ({ id: Number(id) })),
    symptoms: (s?.symptoms ?? []).map(({ id }) => ({ id: Number(id) })),
  };

  const form = useForm<VisitInput>({
    mode: "controlled",
    initialValues: initial,
    validate: {
      diagnosis: isNotEmpty("Πρέπει να συμπληρωθεί!"),
      comments: isNotEmpty("Πρέπει να συμπληρωθεί!"),
      reason: isNotEmpty("Πρέπει να συμπληρωθεί!"),
      examination: isNotEmpty("Πρέπει να συμπληρωθεί!"),
    },
  });
  const { update, isLoading, error } = useUpdateVisit(Number(id));

  const handleSubmit = async (values: VisitInput) => {
    await update(values);
    navigate(`/visit-details/${id}`, {
      state: { name: s.name, surname: s.surname, amka: s.amka ?? "" },
    });
  };

  return (
    <div className="flex justify-center mt-[5vh]">
      <div className="w-[100%] md:w-[75%]">
        <FormCard
          form={form}
          visitor={{ name: s.name, surname: s.surname }}
          onSubmit={() => handleSubmit(form.values)}
          isLoading={isLoading}
          error={error}
          mode="update"
        />
      </div>
    </div>
  );
}
