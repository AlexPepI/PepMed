import { Table, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import type { Visitor } from '../../types/visitor';

type Props = {
  visitors: Visitor[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

const VisitorTable = ({ visitors, hasMore, loading, onLoadMore }: Props) => {
  const navigate = useNavigate();

  const rows = visitors.map((v) => (
    <Table.Tr key={v.id} className="cursor-pointer">
      <Table.Td onClick={() => navigate(`/visitor-details/${v.id}`)} style={{ textAlign: 'center' }}>
        {v.name} {v.surname}
      </Table.Td>
      <Table.Td onClick={() => navigate(`/visitor-details/${v.id}`)} style={{ textAlign: 'center' }}>
        {v.amka}
      </Table.Td>
      <Table.Td onClick={() => navigate(`/visitor-details/${v.id}`)} style={{ textAlign: 'center' }}>
        {v.latest_visit ? new Date(v.latest_visit).toLocaleString('el-GR') : '-'}
      </Table.Td>
      <Table.Td className="flex items-center justify-center">
        <Button p={6} radius="xl" size="xs"   onClick={() => navigate(`/new-visit/${v.id}`, {state: { visitor: { id: v.id, name: v.name, surname: v.surname } }})}>
          <IconPlus size={16} />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (loading || !hasMore) return;
      const el = e.currentTarget;
      const threshold = 80;
      const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
      if (reachedBottom) onLoadMore();
    },
    [loading, hasMore, onLoadMore]
  );

  return (
    <div className="mt-10">
      <div className="relative">
        <Table.ScrollContainer
          className="w-[80vw] max-w-[800px] border-b border-gray-700"
          minWidth={450}
          maxHeight={307}
          type="native"
          onScroll={handleScroll}
        >
          <Table stickyHeader striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ textAlign: 'center' }}>Ονοματεπώνυμο</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Α.Μ.Κ.Α</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Τελευταία Επίσκεψη</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Επίσκεψη</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
              {loading && (
                <Table.Tr>
                  <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                    Φόρτωση…
                  </Table.Td>
                </Table.Tr>
              )}
              {!loading && visitors.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                    Δεν βρέθηκαν αποτελέσματα
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </div>
  );
};

export default VisitorTable;
