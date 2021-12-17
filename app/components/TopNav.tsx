import { Category } from "@prisma/client";
import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";

interface TopNavProps {
  categories: Category[];
}

export const TopNav = ({ categories }: TopNavProps): JSX.Element => {
  return (
    <nav className="flex border-b w-full border-gray-600/50 flex-col mt-4">
      <ul className="flex">
        {categories.map((category, i) => (
          <NavLink key={category.slug} to={category.slug}>
            <li
              className={classNames(
                "flex items-center content-center px-4 pt-2 pb-3 text-center hover:text-slate-300 hover:cursor-pointer rounded"
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
