import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps): JSX.Element => {
  return (
    <input
      {...props}
      className="px-2 h-10 text-black rounded border-cyan-400 w-auto"
    />
  );
};
