import React, { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = ({
  className,
  ...rest
}: TextAreaProps): JSX.Element => {
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

      <div className="mt-1 relative rounded-md shadow-sm">
        <textarea
          name={rest.name}
          id={rest.name}
          rows={20}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 h-128 pr-12 sm:text-sm border-gray-300 rounded-md text-black"
          placeholder={rest.placeholder}
          {...rest}
        />
      </div>
    </div>
  );
};
