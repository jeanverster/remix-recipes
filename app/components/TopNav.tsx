import { Category } from "@prisma/client";
import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";

interface TopNavProps {
  categories: Category[];
  action: string;
}

export const TopNav = ({ categories }: TopNavProps): JSX.Element => {
  return (
    <nav className="flex border-b w-full border-gray-600/50 flex-col mt-4">
      <ul className="flex">
        {categories.map((category, i) => (
          <NavLink to={category.id}>
            <li
              key={category.id}
              className={classNames(
                "flex items-center mr-4 pt-2 pb-3 hover:text-slate-300 text-white hover:cursor-pointer rounded"
              )}
            >
              <span>{category.name}</span>
            </li>
          </NavLink>
        ))}
        {categories.length === 0 && (
          <li className="flex items-center py-1">
            <span className="text-white">No categories yet...</span>
          </li>
        )}
      </ul>
    </nav>
  );
};
