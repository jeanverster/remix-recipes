import cx from "classnames";
import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: any;
}

export const IconButton = ({
  icon: Icon,
  className,
  ...rest
}: IconButtonProps): JSX.Element => {
  return (
    <button
      {...rest}
      className={cx(
        "content-center w-8 h-8 items-center bg-slate-700  hover:bg-blue-200 font-bold rounded flex",
        className
      )}
    >
      <Icon className="w-4 h-4 mx-auto" />
    </button>
  );
};
