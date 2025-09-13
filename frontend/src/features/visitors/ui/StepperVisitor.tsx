import { Stepper } from "@mantine/core";
import type { VisitorForm } from "../form";
import type { VisitorInput } from "../../../types/visitor";

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
    <Stepper.Step label="Στοιχεία Επισκέπτη" description="Προσθήκη στοιχείων">
      {/* <VisitorFormCard form={form} nextStep={nextStep} type="create" /> */}
    </Stepper.Step>
    <Stepper.Step label="Ιστορικό" description="Προσθήκη ιατρικού ιστορικού">
      {/* <VisitorHistory
        form={form}
        prevStep={prevStep}
        add={add}
        isLoading={isLoading}
        error={error}
        type="create"
      /> */}
    </Stepper.Step>
  </Stepper>
);