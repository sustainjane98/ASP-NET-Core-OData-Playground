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
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      type="button"
      className={classNames(
        "focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5",
        {
          "text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-cyan-300":
            variant === ButtonColorVariant.DEFAULT,
          "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-gray-200":
            variant === ButtonColorVariant.ALTERNATIVE,
          "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300":
            variant === ButtonColorVariant.DARK,
          "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200":
            variant === ButtonColorVariant.LIGHT,
          "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300":
            variant === ButtonColorVariant.GREEN,
          "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-red-300":
            variant === ButtonColorVariant.RED,
          "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300":
            variant === ButtonColorVariant.YELLOW,
          "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300":
            variant === ButtonColorVariant.PURPLE,
          "focus:ring-none bg-transparent outline-none border-none":
            variant === ButtonColorVariant.TRANSPARENT,
        },
        className
      )}
    >
      {children ?? title}
    </button>
  );
};

Button.defaultProps = { variant: ButtonColorVariant.DEFAULT };
