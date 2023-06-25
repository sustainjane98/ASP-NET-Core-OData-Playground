import React from "react";
import { useNavItems } from "../hooks/useNavItems.hook";
import { NavigationTab } from "./navigation-tab";
import { NavigationPlusTab } from "./navigation-plus-tab";

/**
 * An NavigationTabHeader React Component.
 * @author Jane Will
 * @version 0.1
 */
export const NavigationTabHeader: React.FC = () => {
  const { navItems } = useNavItems();

  return (
    <header>
      <nav className="flex gap-x-[0.15rem] gap-y-[0.05rem] flex-wrap">
        {navItems.map((item, index) => (
          <NavigationTab {...item} disableCancel={index === 0} key={`nav-tab-${index}`} />
        ))}
        <NavigationPlusTab />
      </nav>
    </header>
  );
};
