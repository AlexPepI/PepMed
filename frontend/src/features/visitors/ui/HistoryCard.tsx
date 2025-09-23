import { Card, Text, Button, Textarea, TextInput, Alert } from "@mantine/core";
import type { VisitorForm } from "../form";
import type { VisitorInput } from "../../../types/visitor";
import MultiSelectConst from "../../referenceData/ui/MultiSelectReferenceData";
import { getErrorMessage } from "../../../lib/errors";
import type { MedicineLink, ConstantRef } from "../../../types/visitor";
import type { IdRef } from "../../../types/visit";

type Props = {
  form: VisitorForm;
  mode: "create" | "update";
  onBack: () => void;
  onSubmit: (values: VisitorInput) => void | Promise<unknown>;
  submitting: boolean;
  error?: unknown;
};

function HistoryCard({
  form,
  mode,
  onBack,
  onSubmit,
  submitting,
  error,
}: Props) {
  const errMsg = error instanceof Error ? error : error ? String(error) : "";

  const toIdRefs = (arr: MedicineLink[] | ConstantRef[] | undefined): IdRef[] =>
    (arr ?? []).map((x) =>
      "medicine" in x ? { id: x.medicine.id } : { id: x.id }
    );

  const fromIdRefsToConstantRefs = (ids: IdRef[]): ConstantRef[] =>
    ids.map(({ id }) => ({ id, name: "" }));

  return (
    <Card
      className="w-[100%] md:w-[75%] mt-[5vh] m-auto"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section withBorder inheritPadding py="xs">
        <div className="flex justify-center md:justify-normal">
          <Text size="xl" fw={500}>
            {mode === "create"
              ? "Add Medical History"
              : `Update Medical History of visitor : ${form.values.name} ${form.values.surname}`}
          </Text>
        </div>
      </Card.Section>
      <form onSubmit={form.onSubmit(() => onSubmit(form.values))}>
        <Card.Section withBorder inheritPadding py="xs">
          <div className="flex justify-center">
            <Textarea
              className="w-[100%] md:w-[50%] mb-5 mt-5"
              autosize
              minRows={4}
              maxRows={10}
              label="Medical History"
              placeholder="Medical History"
              key={form.key("history")}
              {...form.getInputProps("history")}
            />
          </div>

          {(form.values.smoker === "smoker" ||
            form.values.smoker === "ex_smoker") && (
            <div className="flex justify-center">
              <div className="w-[100%] md:w-[50%] flex flex-col items-center md:flex-row md:flex-wrap justify-around gap-3">
                <TextInput
                  className="w-[100%] md:w-[30%] min-w-[135px]"
                  label="Years Smoking"
                  placeholder="Add"
                  key={form.key("years_smoking")}
                  {...form.getInputProps("years_smoking")}
                />
                <TextInput
                  className="w-[100%] md:w-[30%] min-w-[135px]"
                  label="Cigarettes/day"
                  placeholder="Add"
                  key={form.key("cig_per_day")}
                  {...form.getInputProps("cig_per_day")}
                />
              </div>
            </div>
          )}
        </Card.Section>

        <div className="flex flex-wrap">
          <div className="md:w-[20%] min-w-[160px] w-[100%] mt-4 m-auto">
            <MultiSelectConst
              placeholder="Add Medication"
              type="medicine"
              title="Medication"
              value={toIdRefs(form.values.medicines)}
              onChange={(next: IdRef[]) =>
                form.setFieldValue("medicines", fromIdRefsToConstantRefs(next))
              }
            />
          </div>
          <div className="md:w-[20%] min-w-[160px] w-[100%] mt-4 m-auto">
            <MultiSelectConst
              placeholder="Add Condition"
              type="disease"
              title="Condition"
              value={form.values.diseases ?? []}
              onChange={(next: IdRef[]) =>
                form.setFieldValue("diseases", fromIdRefsToConstantRefs(next))
              }
            />
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-10">
          <Button variant="default" radius="xl" onClick={onBack}>
            Back
          </Button>
          <Button
            className="ml-[10px]"
            radius="xl"
            type="submit"
            disabled={submitting}
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      </form>
      {errMsg && (
        <div className="mt-4 mb-2 flex ">
          <Alert
            color="red"
            title="Error"
            className="md:w-[50%] min-w-[160px] w-[100%] m-auto"
          >
            {getErrorMessage(error)}
          </Alert>
        </div>
      )}
    </Card>
  );
}

export default HistoryCard;
