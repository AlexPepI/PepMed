import { Card, Text, Textarea, TextInput, Divider, Button, Alert } from '@mantine/core';
import MultiSelectConst from '../../referenceData/ui/MultiSelectReferenceData';
import type { VisitInput } from '../../../types/visit';
import type { UseFormReturnType } from '@mantine/form';
import type { Queued } from './FilesBox';
import { getErrorMessage } from '../../../lib/errors';
import FilesBox from './FilesBox';

type Props = {
  form: UseFormReturnType<VisitInput>;
  visitor: { name: string; surname: string };
  onSubmit: () => void;
  isLoading: boolean;
  error: unknown;
  files: Queued[];
  setFiles: React.Dispatch<React.SetStateAction<Queued[]>>;
};

export default function FormCard({ form, visitor, onSubmit, isLoading, error, files, setFiles }: Props) {
  return (
    <Card className="w-[100%] md:w-[75%] mt-[5vh] m-auto" shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Card.Section withBorder inheritPadding py="xs">
          <div className="flex justify-center md:justify-normal">
            <Text size="xl" fw={500}>
              New Visit : {visitor.name} {visitor.surname}
            </Text>
          </div>
        </Card.Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="md:w-[50%] mt-2 min-w-[190px] w-[80%] m-auto">
            <TextInput
              label="Reason for Visit"
              withAsterisk
              placeholder="Add reason for visit"
              key={form.key('reason')}
              {...form.getInputProps('reason')}
            />
          </div>

          <div className="md:w-[50%] min-w-[190px] w-[80%] m-auto">
            <MultiSelectConst
              placeholder="Add Symptom"
              type="symptom"
              title="Symptoms"
              value={form.values.symptoms ?? []}
              onChange={(next) => form.setFieldValue('symptoms', next)}
            />
          </div>
          <div className="md:w-[50%] min-w-[190px] w-[80%] m-auto">
            <Textarea
              autosize
              minRows={4}
              withAsterisk
              label="Clinical Examination"
              placeholder="Add clinical examination"
              key={form.key('examination')}
              {...form.getInputProps('examination')}
            />
          </div>
          <div className="md:w-[50%] min-w-[190px] w-[80%] m-auto">
            <Textarea
              autosize
              minRows={4}
              label="Lab Workup"
              placeholder="Add laboratory tests"
              key={form.key('control')}
              {...form.getInputProps('control')}
            />
          </div>
          <div className="md:col-span-2 m-auto w-full flex justify-center">
            <FilesBox files={files} setFiles={setFiles} />
          </div>
          <Divider className="col-span-1 md:col-span-2 mt-2 w-full" />
          <div className="m-auto col-span-1 md:col-span-2 mt-2 w-[80%] md:w-[55%]">
            <TextInput
              label="Diagnosis"
              placeholder="Add diagnosis"
              withAsterisk
              key={form.key('diagnosis')}
              {...form.getInputProps('diagnosis')}
            />
          </div>

          <div className="col-span-1 md:col-span-2 m-auto w-[80%] md:w-[55%]">
            <Textarea
              autosize
              minRows={4}
              label="Recommendations / Instruction"
              placeholder="Add instructions"
              withAsterisk
              key={form.key('comments')}
              {...form.getInputProps('comments')}
            />
          </div>

          <div className="col-span-1 md:col-span-2 m-auto w-[80%] md:w-[55%]">
            <MultiSelectConst
              placeholder="Add Medication"
              type="medicine"
              title="Medication"
              value={form.values.medicines ?? []}
              onChange={(next) => form.setFieldValue('medicines', next)}
            />
          </div>
        </div>

        {!!error && (
          <Alert color="red" className="mt-4">
            {getErrorMessage(error)}
          </Alert>
        )}

        <div className="flex justify-center md:justify-end mt-5">
          <Button disabled={isLoading} className="ml-[10px]" radius="xl" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}
