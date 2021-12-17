import { Recipe } from "@prisma/client";
import cx from "classnames";
import React from "react";
import { ChevronRight } from "react-feather";
import { NavLink } from "react-router-dom";

interface RecipeItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  recipe: Recipe;
}

export const RecipeItem = ({
  className,
  recipe,
}: RecipeItemProps): JSX.Element => {
  return (
    <NavLink to={recipe.slug} end className="flex w-full">
      <div
        className={cx(
          "inline-flex border-b border-gray-600/50 py-4 items-center justify-between w-full",
          className
        )}
      >
        <h3>{recipe.title}</h3>
        <ChevronRight />
      </div>
    </NavLink>
  );
};
