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
  handleSubmit: (payload: VisitorInput) => Promise<any>;
  isLoading: boolean;
  error: unknown;
  mode:"create" | "update";
};

export const StepperVisitor = ({
  active,
  setActive,
  nextStep,
  prevStep,
  form,
  handleSubmit,
  isLoading,
  error,
  mode
}: Props) => {

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      className="w-[80%]"
      allowNextStepsSelect={false}
    >
      <Stepper.Step label="Personal Information" description={mode==="create"?"Add Data":"Update Data"}>
        <FormCard form={form} nextStep={nextStep} type={mode} />
      </Stepper.Step>
      <Stepper.Step label="Medical History" description={mode==="create"?"Add Medical History":"Update Medical History"}>
        <HistoryCard
          form={form}
          onBack={prevStep}
          onSubmit={handleSubmit}
          submitting={isLoading}
          error={error}
          mode={mode}
        />
      </Stepper.Step>
    </Stepper>
  );
};
