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
        <p style="white-space: pre-line">{recipe?.body}</p>
      </div>
    </div>
  );
};

export default Recipe;

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col text-center w-full p-8">
      <h1 className="font-bold mb-4">There was an error</h1>
      <p className="font-bold text-red-400">{error.message}</p>
      <hr className="my-4" />
      <p>
        Hey, developer, you should replace this with what you want your users to
        see.
      </p>
    </div>
  );
}
