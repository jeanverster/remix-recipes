import React from "react";

interface IconButtonProps {
  icon: any;
  onClick: () => void;
}

export const IconButton = ({ icon: Icon }: IconButtonProps): JSX.Element => {
  return (
    <button
      aria-label="Home"
      className="w-8 h-8 bg-white hover:bg-blue-200 font-bold rounded"
    >
      <Icon className="w-4 h-4 mx-auto" />
    </button>
  );
};
