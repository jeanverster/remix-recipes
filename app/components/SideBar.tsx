import { Category } from "@prisma/client";
import classNames from "classnames";
import React from "react";
import { Plus } from "react-feather";
import { NavLink } from "react-router-dom";
import { Form } from "remix";
import { IconButton, Input } from ".";

interface SideBarProps {
  categories: Category[];
  action: string;
}

export const SideBar = ({ categories }: SideBarProps): JSX.Element => {
  return (
    <aside className="flex bg-slate-800 p-4 flex-col">
      <ul className="flex flex-col">
        {categories.map((category, i) => (
          <NavLink to={category.id}>
            <li
              key={category.id}
              className={classNames(
                "flex items-center px-4 py-2 bg-white hover:bg-slate-300 hover:cursor-pointer rounded",
                i < categories.length - 1 && "mb-4"
              )}
            >
              <span className="text-black">{category.name}</span>
            </li>
          </NavLink>
        ))}
        {categories.length === 0 && (
          <li className="flex items-center py-1">
            <span className="text-white">No categories yet...</span>
          </li>
        )}
      </ul>
      <Form method="post">
        <div className="w-full flex flex-1 mt-4">
          <Input type="text" name="name" placeholder="New category" />
          <IconButton type="submit" className="ml-4" icon={Plus} />
        </div>
      </Form>
    </aside>
  );
};
