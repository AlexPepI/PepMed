import { Card, Text, Button, TextInput, NativeSelect } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import type { VisitorForm } from "../form";

type Props = {
  nextStep: () => void;
  form: VisitorForm;
  type: "create" | "update";
};



function FormCard({ nextStep, form, type }: Props) {

  return (
    <Card
      className="w-[100%] md:w-[75%] mt-[5vh] m-auto"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section withBorder inheritPadding py="xs">
        <div className="flex justify-center md:justify-normal">
          <Text size="xl" fw={500}>
            {type === "create"
              ? "Add New Visitor"
              : `Update Visitor's Data`}
          </Text>
        </div>
      </Card.Section>

      <form onSubmit={form.onSubmit(() => nextStep())}>
        <div className="flex m-auto flex-col w-[80%] mt-[20px] gap-3">
          <Card.Section withBorder inheritPadding py="xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[10px]">
              <TextInput
                label="Name"
                placeholder="Name"
                withAsterisk
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Surname"
                placeholder="Surname"
                withAsterisk
                key={form.key("surname")}
                {...form.getInputProps("surname")}
              />
              <TextInput
                label="E-mail"
                placeholder="E-mail"
                mt="md"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Phone number"
                placeholder="Phone number"
                mt="md"
                key={form.key("phoneNumber")}
                {...form.getInputProps("phoneNumber")}
              />
            </div>
          </Card.Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NativeSelect
              label="Gender"
              mt="md"
              withAsterisk
              key={form.key("gender")}
              {...form.getInputProps("gender")}
              onChange={(e) =>
                form.setFieldValue("gender", e.currentTarget.value)
              }
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
            <TextInput
              label="Personal Number"
              placeholder="Personal nuber"
              mt="md"
              key={form.key("amka")}
              {...form.getInputProps("amka")}
            />
            <DatePickerInput
              label="Birth Date"
              placeholder="Birth Date"
              withAsterisk
              mt="md"
              key={form.key("birth_date")}
              {...form.getInputProps("birth_date")}
              maxDate={new Date()}
            />
            <NativeSelect
              label="Smoker"
              mt="md"
              withAsterisk
              key={form.key("smoker")}
              {...form.getInputProps("smoker")}
              data={[
                { value: "smoker", label: "Smoker" },
                { value: "non_smoker", label: "No Smoker" },
                { value: "ex_smoker", label: "Ex Smoker" },
              ]}
            />
            <TextInput
              label="Weight (Kg)"
              placeholder="Weight"
              withAsterisk
              mt="md"
              key={form.key("weight")}
              {...form.getInputProps("weight")}
            />
            <TextInput
              label="Height (cm)"
              placeholder="Height"
              withAsterisk
              mt="md"
              key={form.key("height")}
              {...form.getInputProps("height")}
            />
          </div>
          <div className="flex justify-center md:justify-end">
            <Button radius="xl" type="submit">
              Next
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default FormCard;
