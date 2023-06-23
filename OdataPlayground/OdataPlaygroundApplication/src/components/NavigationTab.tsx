import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { NavItem } from "../types/navItem.type";
import { useNavItems } from "../hooks/useNavItems.hook";

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
    <button
      type="button"
      className="text-white bg-cyan-700 font-medium text-sm px-5 py-2.5"
    >
      <div className="flex gap-x-4 items-center">
        <span className="font-normal text-base">{title}</span>
        {!disableCancel && (
          <button
            onClick={() => removeNavItem(id)}
            className="hover:text-gray-200"
          >
            <XMarkIcon width={20} />
          </button>
        )}
      </div>
    </button>
  );
};

NavigationTab.defaultProps = { disableCancel: false };
