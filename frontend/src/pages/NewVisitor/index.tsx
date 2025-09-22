import { useState } from "react";
import { useAddVisitor } from "../../features/visitors/hooks/useAddVisitor";
import { StepperVisitor } from "../../features/visitors/ui/StepperVisitor";
import {
  buildNewVisitorForm,
  newVisitorInitialValues,
} from "../../features/visitors/form";
import BlockingOverlay from "../../components/Feedback/BlockingOverlay";
import { useNavigate } from "react-router";
import type { VisitorInput } from "../../types/visitor";

const NewVisitor = () => {
  const form = buildNewVisitorForm(newVisitorInitialValues);
  const { add, isLoading, error } = useAddVisitor();

  const [active, setActive] = useState(0);
  const [overlay, setOverlay] = useState(false);
  const nextStep = () => setActive((c) => (c < 2 ? c + 1 : c));
  const prevStep = () => setActive((c) => (c > 0 ? c - 1 : c));

  const navigate = useNavigate();

  const handleSubmit = async (values: VisitorInput) => {
    try {
      setOverlay(true);
      const created = await add(values);
      const newId: number | undefined =
        created?.id ?? created?.data?.id ?? created?.visitor?.id;

      if (newId) {
        navigate(`/new-visit/${newId}`, {
          state: { visitor: { ...values, id: newId } },
        });
      }
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
      />
      <BlockingOverlay visible={overlay} label="Creating visitor..." />
    </div>
  );
};

export default NewVisitor;
