import { useForm, isNotEmpty } from '@mantine/form';
import type { VisitInput } from '../../types/visit';

export const newVisitInitialValues: VisitInput = {
  diagnosis: '',
  comments: '',
  reason: '',
  examination: '',
  control: '',
  medicines: [],
  symptoms: [],
};

export function buildNewVisitForm(initial: Partial<VisitInput> = {}) {
  return useForm<VisitInput>({
    mode: 'controlled',
    initialValues: { ...newVisitInitialValues, ...initial },
    validate: {
      diagnosis: isNotEmpty('Πρέπει να συμπληρωθεί!'),
      comments: isNotEmpty('Πρέπει να συμπληρωθεί!'),
      reason: isNotEmpty('Πρέπει να συμπληρωθεί!'),
      examination: isNotEmpty('Πρέπει να συμπληρωθεί!'),
    },
  });
}

export type VisitForm = ReturnType<typeof buildNewVisitForm>;