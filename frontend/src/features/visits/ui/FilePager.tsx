import { Button, Group, Text } from "@mantine/core";
import { IconArrowNarrowRight, IconArrowNarrowLeft } from "@tabler/icons-react";

type Props = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDelete?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  showDelete?: boolean;
};

const FilePager = ({
  index,
  total,
  onPrev,
  onNext,
  onDelete,
  disablePrev,
  disableNext,
  showDelete = true,
}: Props) => (
  <Group justify="space-between" mt="md" wrap="wrap">
    <div>
      <Button disabled={disablePrev} radius="xl" size="sm" onClick={onPrev}>
        <IconArrowNarrowLeft size={16} />
      </Button>
      <Button
        ml="sm"
        disabled={disableNext}
        radius="xl"
        size="sm"
        onClick={onNext}
      >
        <IconArrowNarrowRight size={16} />
      </Button>
      <Text ml="md" span>
        {total ? index + 1 : 0} / {total}
      </Text>
    </div>
    {showDelete && onDelete && (
      <div className="flex gap-2">
        <Button color="red" radius="xl" onClick={onDelete}>
          Διαγραφή
        </Button>
      </div>
    )}
  </Group>
);

export default FilePager;
