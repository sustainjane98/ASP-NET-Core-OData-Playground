import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavItems } from "../hooks/useNavItems.hook";
import { Button } from "./button";

/**
 * An NavigationPlusTab React Component.
 * @author Jane Will
 * @version 0.1
 */
export const NavigationPlusTab: React.FC = () => {
  const { addNavItem } = useNavItems();

  return (
    <Button
      className="rounded-none"
      onClick={addNavItem}
      disableFocus
      type="button"
    >
      <PlusIcon width={20} />
    </Button>
  );
};
