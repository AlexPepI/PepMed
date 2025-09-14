import { Stepper } from "@mantine/core";
import type { VisitorForm } from "../form";
import type { VisitorInput } from "../../../types/visitor";
import FormCard from "./FormCard";
import HistoryCard from "./HistoryCard";

type Props = {
  active: number;
  setActive: (n: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  form: VisitorForm;
  add: (payload: VisitorInput) => Promise<any>;
  isLoading: boolean;
  error: unknown;
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
}: Props) => (
  <Stepper active={active} onStepClick={setActive} className="w-[80%]" allowNextStepsSelect={false}>
    <Stepper.Step label="Visitors Data" description="Add Data">
      <FormCard form={form} nextStep={nextStep} type="create" />
    </Stepper.Step>
    <Stepper.Step label="Medical History" description="Add Medical History">
      <HistoryCard
        form={form}
        onBack={prevStep}
        onSubmit={add}
        submitting={isLoading}
        error={error}
        mode="create"
      />
    </Stepper.Step>
  </Stepper>
);