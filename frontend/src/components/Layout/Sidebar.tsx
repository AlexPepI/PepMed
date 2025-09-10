import { Link } from 'react-router';
import { AppShell, Burger, NavLink, Divider } from '@mantine/core';
import { NAV_ITEMS } from '../../navigation/pages';
import { IconDeviceDesktopUp } from '@tabler/icons-react';
import ReferenceDataModal from '../../features/referenceData/ui/ReferenceDataModal';

type Props = { opened: boolean; toggle: () => void };

export default function Sidebar({ opened, toggle }: Props) {
  
  const handleNav = () => opened && toggle();

  return (
    <AppShell.Navbar p="md" 
      style={{ 
        backgroundColor: '#171717',
         transition: 'width 0.3s ease',
          textWrap: 'nowrap' 
      }}
    >
      <AppShell.Section>
        <div className="flex">
          <Burger 
            color="#C9C9C9"
            opened={opened} 
            onClick={toggle} 
            size="sm" 
            style={
              !opened ?
              { margin: 'auto' }: 
              { marginLeft: 'auto' }
            } 
          />
        </div>
      </AppShell.Section>
      <AppShell.Section grow>
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink key={path} component={Link} to={path} onClick={handleNav}
                   label={label} leftSection={<Icon size={20} />}
                   style={{ borderRadius: 25, marginTop: 15, height: 48 }} />
        ))}
        <ReferenceDataModal />
      </AppShell.Section>
      <AppShell.Section>
        <Divider my="sm" />
        <NavLink 
          leftSection={<IconDeviceDesktopUp size="1.5rem" />}
          label="Upgrade"
          style={{ marginTop: 10, height: 48, borderRadius: 25 }}
        />
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
