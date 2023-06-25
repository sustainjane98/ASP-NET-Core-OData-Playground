import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { NavItem } from "../types/navItem.type";
import { useNavItems } from "../hooks/useNavItems.hook";
import { Button, ButtonColorVariant } from "./button";

/**
 * An NavigationTab React Component.
 * @author Jane Will
 * @version 0.1
 */
export const NavigationTab: React.FC<NavItem & { disableCancel?: boolean }> = ({
  title,
  id,
  disableCancel,
}) => {
  const { removeNavItem } = useNavItems();

  return (
    <Button
      type="button"
      disablePadding
      className="text-white bg-cyan-700 font-medium text-sm focus:ring-0 rounded-none px-2 py-3"
    >
      <div className="flex gap-x-4 items-center">
        <span className="font-normal text-base">{title}</span>
        {!disableCancel && (
          <Button
            variant={ButtonColorVariant.TRANSPARENT}
            onClick={() => removeNavItem(id)}
            disablePadding
            disableFocus
            className="hover:text-gray-200"
          >
            <XMarkIcon width={20} />
          </Button>
        )}
      </div>
    </Button>
  );
};

NavigationTab.defaultProps = { disableCancel: false };
