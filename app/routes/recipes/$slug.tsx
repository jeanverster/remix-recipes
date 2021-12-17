import { Category, Recipe } from "@prisma/client";
import * as React from "react";
import type { LoaderFunction } from "remix";
import { json, Link, Outlet, useLoaderData } from "remix";
import { db } from "~/prisma";
import { Button, RecipeItem } from "../../components";

interface CategoryProps {}

export const loader: LoaderFunction = async ({ params }) => {
  const recipes = await db.recipe.findMany({
    where: {
      category: {
        slug: params.slug,
      },
    },
  });
  return json({ recipes });
};

const Category = (props: CategoryProps): JSX.Element => {
  const { recipes } =
    useLoaderData<{ recipes: Recipe[]; category: Category }>();
  return (
    <div className="flex flex-1 items-start pt-4">
      <div className="flex flex-1 border-r h-full w-full border-gray-600/50 flex-col items-start border-ri pr-4">
        {recipes.length === 0 && (
          <div className="flex items-center justify-center">
            <span>No recipes yet...</span>
          </div>
        )}
        {recipes?.map((recipe) => (
          <RecipeItem recipe={recipe} />
        ))}
        <Link to="new">
          <Button className="mt-4">New Recipe +</Button>
        </Link>
      </div>
      <div className="flex flex-1 flex-col items-start">
        <Outlet />
      </div>
    </div>
  );
};

export default Category;
