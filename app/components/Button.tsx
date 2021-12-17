import cx from "classnames";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  className,
  children,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <div className={cx("inline-flex rounded-md shadow", className)}>
      <button
        {...rest}
        className={cx(
          "inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
        )}
      >
        {children}
      </button>
    </div>
  );
};
