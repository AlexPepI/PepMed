import { useState } from "react";
import { Button, Modal, FileInput, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import {uploadFiles} from "../../../features/visits/uploadFiles";
import { visit as visitKey } from "../../../features/visits/queryKeys";

type Props = { visitId: number };

const FileUploadModal = ({ visitId }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const qc = useQueryClient();

  const handleUpload = async () => {
    if (!files?.length) return;
    setSubmitting(true);
    try {
      await uploadFiles(visitId, files);
      await qc.invalidateQueries({ queryKey: visitKey(visitId) });
      setFiles(null);
      close();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button radius="xl" onClick={open}>Προσθήκη αρχείων</Button>
      <Modal opened={opened} onClose={close} title="Ανέβασμα PDF" centered>
        <FileInput
          multiple
          accept="application/pdf"
          placeholder="Επίλεξε PDF"
          value={files as any}
          onChange={(v) => setFiles(v as File[] | null)}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={close}>Άκυρο</Button>
          <Button loading={submitting} onClick={handleUpload}>Ανέβασμα</Button>
        </Group>
      </Modal>
    </>
  );
};

export default FileUploadModal;
