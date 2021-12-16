import { Category } from "@prisma/client";
import * as React from "react";
import { Plus } from "react-feather";
import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, Outlet, redirect, useLoaderData } from "remix";
import slugify from "slugify";
import { db } from "~/prisma";
import { IconButton, Input, TopNav } from "../components";

interface RecipesProps {}

export let loader: LoaderFunction = async () => {
  try {
    const allCategories = await db.category.findMany();
    return json(allCategories);
  } catch (error) {
    console.log("error", error);
    return json([]);
  }
};

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  await db.category.create({
    data: {
      name: body.get("name") as string,
      slug: slugify(body.get("name") as string).toLowerCase(),
    },
  });
  return redirect(`/recipes`);
};

const Recipes = (props: RecipesProps): JSX.Element => {
  const categories = useLoaderData<Category[]>();
  return (
    <div className="flex flex-1">
      <main className="flex flex-1 p-4 flex-col">
        <div className="flex items-center justify-between">
          <h1>Recipes</h1>
          <Form method="post">
            <div className="flex ml-auto">
              <Input type="text" name="name" placeholder="New category" />
              <IconButton type="submit" className="ml-4" icon={Plus} />
            </div>
          </Form>
        </div>
        <nav>
          <TopNav action="/recipes" categories={categories} />
        </nav>
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
