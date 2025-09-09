import { IconHome, IconUserPlus } from "@tabler/icons-react";

export type NavItem = { path: string; label: string; icon: React.FC<{ size?: number }> };

export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home", icon: IconHome },
  { path: "/new-visitor", label: "New Visitor", icon: IconUserPlus },
];
