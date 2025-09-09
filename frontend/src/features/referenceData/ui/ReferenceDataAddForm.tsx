import { useState } from 'react';
import { Input, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useAddConstant } from '../hooks/useAdd';
import type { RefEntity } from '../api';

type Props = { title: string; entity: RefEntity };

export default function ReferenceDataAddForm({ title, entity }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = isDesktop ? 'md' : 'sm';

  const [value, setValue] = useState('');
  const addMutation = useAddConstant(entity);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = value.trim();
    if (!name || addMutation.isPending) return;
    addMutation.mutate(name, { onSuccess: () => setValue('') });
  };

  return (
    <form onSubmit={submit} className="mt-[3%] flex justify-around flex-wrap items-center gap-4">
      <Input
        size={size}
        radius="xl"
        placeholder={`Add new ${title}`}
        className="min-w-[180px] w-[50%]"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button size={size} radius="xl" type="submit" disabled={addMutation.isPending}>
        {addMutation.isPending ? 'In progress…' : 'Add'}
      </Button>
    </form>
  );
}
