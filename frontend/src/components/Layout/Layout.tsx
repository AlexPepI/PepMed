import { Outlet,Link } from 'react-router';
import { useDisclosure } from '@mantine/hooks';
import { NAV_ITEMS } from '../../navigation/pages';
import { IconDeviceDesktopUp } from '@tabler/icons-react';
import { AppShell, Burger, NavLink } from '@mantine/core';
import ReferenceDataModal from '../../features/referenceData/ui/ReferenceDataModal';

export default function Layout() {

  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

      const handleClick = () => {
        if(desktopOpened){
            toggleDesktop();
        }
    }

    return (
        <AppShell
        withBorder={false}
        transitionDuration={300}
        transitionTimingFunction="ease"
        navbar={{
            width: desktopOpened ? 260 : 80,
            breakpoint: desktopOpened ? 'xs' : 0,
        }}
        padding="md"
        >
            <AppShell.Navbar p="md" style={{ backgroundColor: '#171717', transition: 'width 0.3s ease', textWrap: 'nowrap' }}>
                <AppShell.Section>
                    <div className="flex">
                        <Burger color="#C9C9C9" opened={desktopOpened} onClick={toggleDesktop} size="sm" style={!desktopOpened ? { margin: 'auto' } : { marginLeft: 'auto' }} />
                    </div>
                </AppShell.Section>
                <AppShell.Section grow>
                    {NAV_ITEMS.map(({path,label,icon:Icon}) => (
                        <NavLink
                            key={path}
                            component={Link}
                            to={path}
                            onClick={()=>handleClick()}
                            label={label}
                            leftSection={<Icon size={20} />} 
                            style={{ borderRadius: 25, marginTop: 15, height: 48, cursor: 'pointer' }}
                        />
                    ))}
                    <ReferenceDataModal/>
                </AppShell.Section>
                <AppShell.Section style={{ marginTop: '10px', marginBottom: '20px', borderTop: '1px solid grey' }}>
                    <NavLink style={{ marginTop: '10px', height: '48px', borderRadius: '25px' }} leftSection={<IconDeviceDesktopUp size="1.5rem" />} label="Upgrade" />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
