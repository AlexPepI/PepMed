import { Table, Loader, Alert,CloseButton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchConstant, type RefEntity, type RefItem } from '../api.ts';
import { useDelete } from '../hooks/useDelete';
import { constantsQK } from '../queryKeys.ts';
import ReferenceDataAddForm from './ReferenceDataAddForm.tsx';

type Props = { title: string; addTitle: string; entity: RefEntity };

export default function CatalogTable({ title, entity }: Props) {

  const { data, isLoading, isError } = useQuery({
      queryKey: constantsQK.list(entity),
      queryFn: () => fetchConstant(entity),
  });

  const deleteMutation = useDelete(entity);

  return (
    <div className="flex flex-col">
      <div className="mt-[2.5%] ml-[2.5%] font-semibold text-lg">{title}</div>

      <div className="w-[80%] m-auto mt-[1%] mb-[3%]">
        {isLoading && (
          <div className="flex justify-center py-6">
            <Loader />
          </div>
        )}

        {isError && (
          <Alert color="red" variant="light" title="Error" className="mb-3 mt-3">
            Something went wrong. Try again later
          </Alert>
        )}

        {!isLoading && !isError && (
          <Table.ScrollContainer minWidth={100} maxHeight={280} className='mt-3'>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th style={{ width: 140 }}>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {(data ?? []).length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={2} style={{ textAlign: 'center', padding: 24 }}>
                      No data yet
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  (data as RefItem[]).map((row) => (
                    <Table.Tr key={row.id}>
                      <Table.Td>{row.name}</Table.Td>
                      <Table.Td className=''>
                        <div className='justify-end flex ml-auto'>
                          <CloseButton 
                            onClick={() => deleteMutation.mutate(Number(row.id))}
                            disabled={deleteMutation.isPending}
                          />
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
        <ReferenceDataAddForm title={title} entity={entity} />
      </div>
    </div>
  );
}
