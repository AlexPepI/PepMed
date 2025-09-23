import { Divider, List } from "@mantine/core";

type Disease = { id: number; name: string };
type MedicineLink = {
  medicine: { id: number; name: string };
  until: string | null;
};

type Props = {
  medicines: MedicineLink[];
  diseases: Disease[];
};

const ListsSection = ({ medicines, diseases }: Props) => {
  return (
    <div className="flex gap-4 justify-between flex-wrap">
      {!!medicines?.length && (
        <div className="w-[40%] min-w-max ">
          <strong>Medication</strong>
          <Divider className="mb-2" />
          <List spacing="xs" size="sm" center>
            {medicines.map((item) => (
              <List.Item className="ml-4" key={item.medicine.id}>
                {item.medicine.name}
              </List.Item>
            ))}
          </List>
        </div>
      )}
      {!!diseases?.length && (
        <div className="w-[40%] min-w-max ">
          <strong>Conditions</strong>
          <Divider className="mb-2" />
          <List spacing="xs" size="sm" center>
            {diseases.map((item) => (
              <List.Item className="ml-4" key={item.id}>
                {item.name}
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default ListsSection;
