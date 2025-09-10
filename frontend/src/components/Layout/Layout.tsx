import { Outlet } from 'react-router';
import { useDisclosure } from '@mantine/hooks';
import { AppShell } from '@mantine/core';
import Sidebar from './Sidebar';

export default function Layout() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      withBorder={false}
      transitionDuration={300}
      transitionTimingFunction="ease"
      navbar={{ width: opened ? 260 : 80, breakpoint: opened ? 'xs' : 0 }}
      padding="md"
    >
        <Sidebar opened={opened} toggle={toggle} />
        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
    </AppShell>
  );
}
