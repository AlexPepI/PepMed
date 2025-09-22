import { Stepper } from "@mantine/core";
import type { VisitorForm } from "../form";
import type { VisitorInput } from "../../../types/visitor";
import FormCard from "./FormCard";
import HistoryCard from "./HistoryCard";
import { useNavigate } from "react-router";

type Props = {
  active: number;
  setActive: (n: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  form: VisitorForm;
  add: (payload: VisitorInput) => Promise<any>;
  isLoading: boolean;
  error: unknown;
  setOverlay: (n: boolean) => void;
};

export const StepperVisitor = ({
  active,
  setActive,
  nextStep,
  prevStep,
  form,
  add,
  isLoading,
  error,
  setOverlay,
}: Props) => {
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
    <Stepper
      active={active}
      onStepClick={setActive}
      className="w-[80%]"
      allowNextStepsSelect={false}
    >
      <Stepper.Step label="Visitors Data" description="Add Data">
        <FormCard form={form} nextStep={nextStep} type="create" />
      </Stepper.Step>
      <Stepper.Step label="Medical History" description="Add Medical History">
        <HistoryCard
          form={form}
          onBack={prevStep}
          onSubmit={handleSubmit}
          submitting={isLoading}
          error={error}
          mode="create"
        />
      </Stepper.Step>
    </Stepper>
  );
};
