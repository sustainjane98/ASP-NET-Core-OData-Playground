import useZustand from '../../stores';

export const useNavItems = () =>
  useZustand(({ addNavItem, navItems, removeNavItem, setNavItems }) => ({
    addNavItem,
    navItems,
    removeNavItem,
    setNavItems,
  }));
