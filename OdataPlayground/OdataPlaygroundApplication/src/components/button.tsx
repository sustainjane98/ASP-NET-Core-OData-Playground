import classNames from "classnames";
import React, { PropsWithChildren } from "react";

export enum ButtonColorVariant {
  DEFAULT,
  ALTERNATIVE,
  DARK,
  LIGHT,
  GREEN,
  RED,
  YELLOW,
  PURPLE,
  TRANSPARENT,
}

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  children?: PropsWithChildren["children"];
  variant?: ButtonColorVariant;
  disablePadding?: boolean;
  disableFocus?: boolean;
  icons?: React.ReactElement[];
}

/**
 * An Button React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  title,
  variant,
  className,
  disablePadding,
  disableFocus,
  icons,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      type="button"
      className={classNames(
        "flex gap-x-2 items-center font-medium rounded-lg text-sm",
        {
          "px-5 py-2.5": !disablePadding,
          "focus:ring-4 ": !disableFocus,
          "text-white bg-cyan-700 hover:bg-cyan-800":
            variant === ButtonColorVariant.DEFAULT,
          "focus:ring-cyan-500":
            variant === ButtonColorVariant.DEFAULT && !disableFocus,
          "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700":
            variant === ButtonColorVariant.ALTERNATIVE,
          "focus:z-10 focus:ring-gray-200":
            variant === ButtonColorVariant.ALTERNATIVE && !disableFocus,
          "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none":
            variant === ButtonColorVariant.DARK,
          "focus:ring-gray-300":
            variant === ButtonColorVariant.DARK && !disableFocus,
          "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100":
            variant === ButtonColorVariant.LIGHT,
          "focus:ring-gray-200":
            variant === ButtonColorVariant.LIGHT && !disableFocus,
          "focus:outline-none text-white bg-green-700 hover:bg-green-800":
            variant === ButtonColorVariant.GREEN,
          "focus:ring-green-300":
            variant === ButtonColorVariant.GREEN && !disableFocus,
          "focus:outline-none text-white bg-red-700 hover:bg-red-800":
            variant === ButtonColorVariant.RED,
          "focus:ring-red-300":
            variant === ButtonColorVariant.RED && !disableFocus,
          "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500":
            variant === ButtonColorVariant.YELLOW,
          "focus:ring-yellow-300":
            variant === ButtonColorVariant.YELLOW && !disableFocus,
          "focus:outline-none text-white bg-purple-700 hover:bg-purple-800":
            variant === ButtonColorVariant.PURPLE,
          "focus:ring-purple-300":
            variant === ButtonColorVariant.PURPLE && !disableFocus,
          "focus:ring-none bg-transparent outline-none border-none":
            variant === ButtonColorVariant.TRANSPARENT,
        },
        className
      )}
    >
      <span>{children ?? title}</span>
      <div className="flex gapx-1">{icons}</div>
    </button>
  );
};

Button.defaultProps = {
  variant: ButtonColorVariant.DEFAULT,
  disablePadding: false,
  disableFocus: false,
};
