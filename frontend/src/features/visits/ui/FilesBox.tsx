import { Dropzone } from "@mantine/dropzone";
import { Group, Text, ActionIcon } from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";

export type Queued = { id: string; file: File; url: string };

type Props = {
  files: Queued[];
  setFiles: Dispatch<SetStateAction<Queued[]>>;
};

export default function FilesBox({ files, setFiles }: Props) {
  const add = (added: File[]) => {
    setFiles((prev) => {
      const next = [...prev];
      for (const f of added) {
        const exists = next.some(
          (x) =>
            x.file.name === f.name &&
            x.file.size === f.size &&
            x.file.lastModified === f.lastModified
        );
        if (!exists) {
          next.push({
            id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
            file: f,
            url: URL.createObjectURL(f),
          });
        }
      }
      return next;
    });
  };

  const remove = (id: string) => {
    setFiles((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((x) => x.id !== id);
    });
  };

  return (
    <Dropzone multiple className="w-[80%] md:w-[75%] md:min-w-[400px]" onDrop={add} accept={["image/*", "application/pdf"]}>
      {files.length === 0 ? (
        <Group justify="center" mih={120} style={{ pointerEvents: "none" }}>
          <IconUpload />
          <Text>Drag & drop files here, or click</Text>
        </Group>
      ) : (
        <Group wrap="wrap" gap="sm" mih={120} style={{ pointerEvents: "auto" }}>
          {files.map((f) => (
            <div
              key={f.id}
              style={{
                position: "relative",
                width: 100,
                height: 100,
                borderRadius: 8,
                overflow: "hidden",
                background: "grey",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {f.file.type.startsWith("image/") ? (
                <img src={f.url} alt={f.file.name} style={{ maxWidth: "100%", maxHeight: "100%" }} />
              ) : (
                <Text ta="center" fz="xs" px="xs">
                  {f.file.name}
                </Text>
              )}
              <ActionIcon
                variant="filled"
                color="red"
                size="sm"
                onClick={(e) => { e.stopPropagation(); remove(f.id); }}
                style={{ position: "absolute", top: 6, right: 6 }}
              >
                <IconX size={14} />
              </ActionIcon>
            </div>
          ))}
        </Group>
      )}
    </Dropzone>
  );
}
