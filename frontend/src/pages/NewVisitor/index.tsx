import { useState } from "react";
import { useAddVisitor } from "../../features/visitors/hooks/useAddVisitor";
import { StepperVisitor } from "../../features/visitors/ui/StepperVisitor";
import { buildNewVisitorForm, newVisitorInitialValues } from "../../features/visitors/form";


const NewVisitor = () => {
  const form = buildNewVisitorForm(newVisitorInitialValues);
  const { add, isLoading, error } = useAddVisitor();

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((c) => (c < 2 ? c + 1 : c));
  const prevStep = () => setActive((c) => (c > 0 ? c - 1 : c));

  return (

      <div className="flex justify-center mt-[5vh]">
        <StepperVisitor
            active={active}
            setActive={setActive}
            nextStep={nextStep}
            prevStep={prevStep}
            form={form}
            add={add}
            isLoading={isLoading}
            error={error}
        />  
      </div>

  );
};

export default NewVisitor;
