import { Category } from "@prisma/client";
import * as React from "react";
import { Plus } from "react-feather";
import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, Outlet, redirect, useLoaderData } from "remix";
import slugify from "slugify";
import { IconButton, Input, TopNav } from "~/components";
import { db } from "~/prisma";

interface RecipesProps {}

export let loader: LoaderFunction = async () => {
  try {
    const allCategories = await db.category.findMany({
      include: {
        _count: {
          select: {
            recipes: true,
          },
        },
      },
    });
    return json(allCategories);
  } catch (error) {
    return json([]);
  }
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
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
        <TopNav categories={categories} />
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
