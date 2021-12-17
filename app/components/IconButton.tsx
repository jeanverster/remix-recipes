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
        "content-center w-10 h-10 items-center bg-cyan-600 hover:bg-cyan-700 font-bold rounded flex",
        className
      )}
    >
      <Icon className="w-4 h-4 mx-auto" />
    </button>
  );
};
