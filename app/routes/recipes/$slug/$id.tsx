import { Recipe } from "@prisma/client";
import * as React from "react";
import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import { db } from "~/prisma";

interface RecipeProps {}

export const loader: LoaderFunction = async ({ params }) => {
  const recipe = await db.recipe.findUnique({
    where: {
      slug: params.id,
    },
  });
  return json({ recipe });
};

const Recipe = (props: RecipeProps): JSX.Element => {
  const { recipe } = useLoaderData<{ recipe: Recipe }>();
  return (
    <div className="flex flex-1 flex-col items-start p-4">
      <h2 className="font-bold">{recipe?.title}</h2>
      <div className="pt-4">
        <p>{recipe?.body}</p>
      </div>
    </div>
  );
};

export default Recipe;
