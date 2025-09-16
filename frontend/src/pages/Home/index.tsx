import { Title,Alert } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useMemo, useState,useEffect } from 'react';
import SearchVisitor from '../../components/home/SearchVisitor';
import VisitorTable from '../../components/home/VisitorsTable';
import { useVisitorsInfinite } from '../../features/visitors/hooks/useVisitorsInfinite';
import { getErrorMessage } from '../../lib/errors';

const Home = () => {

  const [input, setInput] = useState('');
  const [committed, setCommitted] = useState<string | null>(null);

  const q = useMemo(() => {
    if (!committed) return null;
    const t = committed.trim();
    return t === '' ? null : t;
  }, [committed]);

  const { visitors, fetchNextPage, hasNextPage, isFetching, isPending, error, refetch } =
    useVisitorsInfinite(q);

  const smallerThanMd = useMediaQuery('(max-width: 768px)');

  const handleSubmitSearch = () => {
    setCommitted(input);
    refetch();
  };

  useEffect(() => {
  if (input.trim() === '') {
    setCommitted(''); 
  }
}, [input]);

useEffect(() => {
  if (q === null) {
    refetch();
  }
}, [q, refetch]);

  return (
      <div className="flex flex-col items-center gap-4 mt-[5vh]">
        <div className="mt-[7vh]">
          <Title
            order={1}
            style={{ fontSize: smallerThanMd ? '1.5rem' : '2.5rem' }}
          >
            Αναζήτηση επισκέπτη
          </Title>
        </div>

        <SearchVisitor
          value={input}
          onChange={setInput}
          onSubmit={handleSubmitSearch}
          isSearching={isPending}
        />

        <VisitorTable
          visitors={visitors}
          hasMore={!!hasNextPage}
          loading={isFetching}
          onLoadMore={() => fetchNextPage()}
        />

        <div className="w-[300px]">
          {error &&
                <Alert color="red" variant="light"> {getErrorMessage(error)} </Alert>
            }
        </div>
      </div>
  );
};

export default Home;
