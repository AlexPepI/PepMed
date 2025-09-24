import { Button, Group, Text } from "@mantine/core";
import { IconArrowNarrowRight, IconArrowNarrowLeft } from "@tabler/icons-react";
import FileUploadModal from "./FileUploadModal";

type Props = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDelete?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  showDelete?: boolean;
  visitId:number;
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
  visitId
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
    <div className="flex justify-end mb-3">
      <FileUploadModal visitId={visitId} />
    </div>
    {showDelete && onDelete && (
      <div className="flex gap-2">
        <Button color="red" radius="xl" onClick={onDelete}>
          Delete
        </Button>
      </div>
    )}
  </Group>
);

export default FilePager;
