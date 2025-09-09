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
          Medicines
        </Tabs.Tab>
        <Tabs.Tab value="diseases">
          Diseases
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="symptoms">
            <ReferenceDataTable title="Symptoms" addTitle="Add symptom" entity="symptom"/>
      </Tabs.Panel>

      <Tabs.Panel value="medicines">
            <ReferenceDataTable title="Medicines" addTitle="Add medicine" entity="medicine"/>
      </Tabs.Panel>

      <Tabs.Panel value="diseases">
          <ReferenceDataTable title="Diseases" addTitle="Add disease" entity="disease"/>
      </Tabs.Panel>
    </Tabs>
  );
}

export default ReferenceDataTab