import { Portal, Center, Loader, Paper, Text } from "@mantine/core";

type Props = {
  label?: string;
  zIndex?: number;
};

export default function Loading({ label = "Loading…", zIndex = 2000 }: Props) {
  return (
    <Portal>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex,
          backdropFilter: "blur(2px)",
          background: "rgba(0,0,0,0.35)",
        }}
        role="alert"
      >
        <Center style={{ width: "100%", height: "100%" }}>
          <Paper p="md" radius="xl" shadow="lg" withBorder>
            <Center style={{ gap: 12, minWidth: 220 }}>
              <Loader />
              <Text fw={600}>{label}</Text>
            </Center>
          </Paper>
        </Center>
      </div>
    </Portal>
  );
}
