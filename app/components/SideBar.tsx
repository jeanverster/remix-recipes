import { Category } from "@prisma/client";
import React from "react";
import { Plus } from "react-feather";
import { Form } from "remix";
import { IconButton, Input } from ".";

interface SideBarProps {
  categories: Category[];
}

export const SideBar = (props: SideBarProps): JSX.Element => {
  return (
    <aside className="flex bg-slate-800 p-4 flex-col">
      <ul className="flex flex-col">
        {props.categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center px-4 py-1 bg-white hover:bg-slate-300 rounded"
          >
            <span className="w-4 h-4 mr-2" />
            <span>{category.name}</span>
          </li>
        ))}
        {props.categories.length === 0 && (
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
