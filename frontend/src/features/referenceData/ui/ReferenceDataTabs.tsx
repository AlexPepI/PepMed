import { Tabs } from '@mantine/core';
import ReferenceDataTable from './ReferenceDataTable';

function ReferenceDataTab() {
  return (
    <Tabs radius="md" defaultValue="symptoms">
      <Tabs.List>
        <Tabs.Tab value="symptoms">
          Symptoms
        </Tabs.Tab>
        <Tabs.Tab value="medicines">
          Medications
        </Tabs.Tab>
        <Tabs.Tab value="diseases">
          Conditions
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="symptoms">
            <ReferenceDataTable title="Symptoms" addTitle="Add symptom" entity="symptom"/>
      </Tabs.Panel>

      <Tabs.Panel value="medicines">
            <ReferenceDataTable title="Medications" addTitle="Add medication" entity="medicine"/>
      </Tabs.Panel>

      <Tabs.Panel value="diseases">
          <ReferenceDataTable title="Conditions" addTitle="Add condition" entity="disease"/>
      </Tabs.Panel>
    </Tabs>
  );
}

export default ReferenceDataTab