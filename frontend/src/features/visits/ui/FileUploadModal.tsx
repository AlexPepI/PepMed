import { useEffect, useMemo, useState } from "react";
import { Button, Modal, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { uploadFiles } from "../../../features/visits/uploadFiles";
import { visit as visitKey } from "../../../features/visits/queryKeys";

import FilesBox, { type Queued } from "../ui/FilesBox";

type Props = { visitId: number };

const FileUploadModal = ({ visitId }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [queued, setQueued] = useState<Queued[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const qc = useQueryClient();
  const filesToUpload = useMemo(() => queued.map((q) => q.file), [queued]);

  const handleUpload = async () => {
    if (!filesToUpload.length) return;
    setSubmitting(true);
    try {
      await uploadFiles(visitId, filesToUpload);
      await qc.invalidateQueries({ queryKey: visitKey(visitId) });
      for (const q of queued) URL.revokeObjectURL(q.url);
      setQueued([]);
      close();
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      for (const q of queued) URL.revokeObjectURL(q.url);
    };
  }, [queued]);

  const handleBack = () => close();

  return (
    <>
      <Button radius="xl" onClick={open}>
        Add Files
      </Button>

      <Modal opened={opened} onClose={close} title="Upload PDF" centered>
        <Group justify="center" mb="md">
          <FilesBox files={queued} setFiles={setQueued} />
        </Group>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleBack}>
            Back
          </Button>
          <Button
            loading={submitting}
            onClick={handleUpload}
            disabled={!filesToUpload.length || submitting}
          >
            Add
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default FileUploadModal;
