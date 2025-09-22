import { TextInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

type Props = {
  value: string; 
  onChange: (v: string) => void; 
  onSubmit: () => void; 
  isSearching?: boolean;
};

const SearchVisitor = ({ value, onChange, onSubmit, isSearching }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:mt-5 md:flex-row gap-4 items-center"
    >
      <TextInput
        radius="xl"
        placeholder="Search visitor"
        leftSectionPointerEvents="none"
        leftSection={<IconSearch size={16} />}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="md:w-[20vw] md:min-w-[300px]"
      />
      <Button
        type="submit"
        radius="xl"
        className="size-sm"
        loading={isSearching}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchVisitor;
