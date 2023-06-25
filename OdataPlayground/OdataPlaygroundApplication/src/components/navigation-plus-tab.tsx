import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavItems } from "../hooks/useNavItems.hook";

/**
 * An NavigationPlusTab React Component.
 * @author Jane Will
 * @version 0.1
 */
export const NavigationPlusTab: React.FC = () => {
  const { addNavItem } = useNavItems();

  return (
    <button
      onClick={addNavItem}
      type="button"
      className="text-white bg-cyan-700 font-medium text-sm px-5 py-2.5 hover:text-gray-200"
    >
      <PlusIcon width={20} />
    </button>
  );
};
