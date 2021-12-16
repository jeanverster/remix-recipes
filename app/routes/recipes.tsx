import { Category } from "@prisma/client";
import * as React from "react";
import type { ActionFunction, LoaderFunction } from "remix";
import { json, Outlet, redirect, useLoaderData } from "remix";
import { db } from "~/prisma";
import { SideBar } from "../components";

interface RecipesProps {}

export let loader: LoaderFunction = async () => {
  const allCategories = await db.category.findMany();
  return json(allCategories);
};

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  await db.category.create({
    data: {
      name: body.get("name") as string,
    },
  });
  return redirect(`/recipes`);
};

const Recipes = (props: RecipesProps): JSX.Element => {
  const categories = useLoaderData<Category[]>();
  return (
    <div className="flex flex-1">
      <SideBar action="/recipes" categories={categories} />
      <main className="flex flex-1 p-4 flex-col">
        <h1>Recipes</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default Recipes;

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div>
      <h1>There was an error</h1>
      <p>{error.message}</p>
      <hr />
      <p>
        Hey, developer, you should replace this with what you want your users to
        see.
      </p>
    </div>
  );
}
