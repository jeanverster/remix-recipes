import { Recipe } from "@prisma/client";
import * as React from "react";
import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import { db } from "~/prisma";

interface RecipeProps {}

export const loader: LoaderFunction = async ({ params }) => {
  const recipes = await db.recipe.findMany({
    where: {
      categoryId: params.id,
    },
  });
  return json(recipes);
};

const Recipe = (props: RecipeProps): JSX.Element => {
  const recipes = useLoaderData<Recipe[]>();
  return (
    <div className="flex flex-1 flex-col">
      <h1>Recipes</h1>
    </div>
  );
};

export default Recipe;
