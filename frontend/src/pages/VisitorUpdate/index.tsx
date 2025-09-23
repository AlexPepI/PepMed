import { StepperVisitor } from "../../features/visitors/ui/StepperVisitor";
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { buildNewVisitorForm } from "../../features/visitors/form";
import { useUpdateVisitor } from "../../features/visitors/hooks/useUpdateVisitor";
import type { VisitorInput } from "../../types/visitor";
import BlockingOverlay from "../../components/Feedback/BlockingOverlay";
import type { MedicineLink } from "../../types/visitor";

const VisitorUpdate = () => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((c) => (c < 2 ? c + 1 : c));
  const prevStep = () => setActive((c) => (c > 0 ? c - 1 : c));

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state)

  const newState = {
    ...location.state,
    medicines: (location.state.medicines_links as MedicineLink[]).map(
      (link) => ({
        name: link.medicine.name,
        id: link.medicine.id,
      })
    ),
  };

  const { update, isLoading, error } = useUpdateVisitor(Number(id));
  const form = buildNewVisitorForm(newState);
  const [overlay, setOverlay] = useState(false);

  const handleSubmit = async (values: VisitorInput) => {
    try {
      setOverlay(true);
      await update(values);
      navigate(`/visitor-details/${id}`);
    } catch {
      setOverlay(false);
    }
  };

  return (
    <div className="flex justify-center mt-[5vh]">
      <StepperVisitor
        active={active}
        setActive={setActive}
        nextStep={nextStep}
        prevStep={prevStep}
        form={form}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        mode="update"
      />
      <BlockingOverlay visible={overlay} label="Creating visitor..." />
    </div>
  );
};

export default VisitorUpdate;
