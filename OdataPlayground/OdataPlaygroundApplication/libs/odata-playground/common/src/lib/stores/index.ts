import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { NavItem } from '../types/nav-item.type';

export interface ZustandInitialState {
  navItems: NavItem[];
  setNavItems: (navItems: ZustandInitialState['navItems']) => void;
  addNavItem: () => void;
  removeNavItem: (navItemId: ZustandInitialState['navItems'][0]['id']) => void;
}

export const initalState: StateCreator<
  ZustandInitialState,
  [['zustand/devtools', never]],
  []
> = (set) => ({
  navItems: [{ id: 1, title: 'New Tab (1)' }],
  setNavItems: (navItems) => set((prev) => ({ ...prev, navItems })),
  addNavItem: () =>
    set((prev) => ({
      ...prev,
      navItems: prev.navItems.concat([
        {
          id: prev.navItems.length + 1,
          title: `New Tab (${prev.navItems.length + 1})`,
        },
      ]),
    })),
  removeNavItem: (id) =>
    set((prev) => ({
      ...prev,
      navItems: prev.navItems.filter((item) => item.id !== id),
    })),
});

const useZustand = create<ZustandInitialState>()(devtools(initalState));

export default useZustand;
