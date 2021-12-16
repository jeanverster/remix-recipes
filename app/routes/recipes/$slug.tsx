import { Category, Recipe } from "@prisma/client";
import * as React from "react";
import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import { db } from "~/prisma";

interface RecipeProps {}

export const loader: LoaderFunction = async ({ params }) => {
  const recipes = await db.recipe.findMany({
    where: {
      slug: params.slug,
    },
  });
  return json({ recipes });
};

const Recipe = (props: RecipeProps): JSX.Element => {
  const { recipes } =
    useLoaderData<{ recipes: Recipe[]; category: Category }>();
  return (
    <div className="flex flex-1 items-start pt-4">
      <div className="flex flex-1 flex-col items-start">
        {recipes.length === 0 && (
          <div className="flex items-center justify-center">
            <span>No recipes yet...</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col items-start">
        {recipes.length > 0 && <div>Select a recipe...</div>}
      </div>
    </div>
  );
};

export default Recipe;
