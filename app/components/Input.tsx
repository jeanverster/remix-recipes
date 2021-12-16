import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...rest }: InputProps): JSX.Element => {
  return (
    <input
      {...rest}
      className={classNames(
        "px-2 h-8 text-black rounded border-cyan-400 w-auto",
        className
      )}
    />
  );
};
