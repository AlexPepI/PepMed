import { Stepper } from "@mantine/core";
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { buildNewVisitorForm } from "../../features/visitors/form";
import FormCard from "../../features/visitors/ui/FormCard";
import HistoryCard from "../../features/visitors/ui/HistoryCard";
import { useUpdateVisitor } from "../../features/visitors/hooks/useUpdateVisitor";
import type { VisitorInput } from "../../types/visitor";

const VisitorUpdate = () => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((c) => (c < 2 ? c + 1 : c));
  const prevStep = () => setActive((c) => (c > 0 ? c - 1 : c));

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { update, isLoading, error } = useUpdateVisitor(Number(id));
  const form = buildNewVisitorForm(location.state);

  const handleSubmit = async (values: VisitorInput) => {
    console.log(values);
    await update(values);
    navigate(`/visitor-details/${id}`);
  };

  return (
    <div className="flex justify-center mt-[5vh]">
      <Stepper
        active={active}
        onStepClick={setActive}
        className="w-[80%]"
        allowNextStepsSelect={false}
      >
        <Stepper.Step
          label="Στοιχεία Επισκέπτη"
          description="Επεξεργασία στοιχείων"
        >
          <FormCard nextStep={nextStep} form={form} type="update" />
        </Stepper.Step>
        <Stepper.Step
          label="Ιστορικό"
          description="Επεξεργασία ιατρικού ιστορικού"
        >
          <HistoryCard
            onBack={prevStep}
            form={form}
            onSubmit={handleSubmit}
            submitting={isLoading}
            error={error}
            mode="update"
          />
        </Stepper.Step>
      </Stepper>
    </div>
  );
};

export default VisitorUpdate;
