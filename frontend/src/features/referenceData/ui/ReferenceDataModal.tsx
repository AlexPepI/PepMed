import { useDisclosure } from "@mantine/hooks";
import { Modal, NavLink } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import ReferenceDataTab from "./ReferenceDataTabs";

const ReferenceDataModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        size="55rem"
        onClose={close}
        title={<div className="font-semibold text-2xl">Medical Constants</div>}
      >
        <ReferenceDataTab />
      </Modal>
      <NavLink
        label="Medical Constants"
        leftSection={<IconDatabase />}
        onClick={open}
        style={{
          borderRadius: "25px",
          marginTop: "15px",
          height: "48px",
          cursor: "pointer",
        }}
      />
    </>
  );
};

export default ReferenceDataModal;
