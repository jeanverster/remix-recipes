import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ className, ...rest }: InputProps): JSX.Element => {
  return (
    <div className={className}>
      {rest.label && (
        <label
          htmlFor={rest.name}
          className="block text-sm font-medium text-gray-300"
        >
          {rest.label}
        </label>
      )}

      <div
        className={classNames(
          "relative rounded-md shadow-sm",
          rest.label && "mt-1"
        )}
      >
        <input
          type="text"
          name={rest.name}
          id={rest.name}
          className="focus:ring-indigo-500 h-10 focus:border-cyan-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md text-black"
          placeholder={rest.placeholder}
          {...rest}
        />
      </div>
    </div>
  );
};
