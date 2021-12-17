import { Category } from "@prisma/client";
import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { json, useLoaderData } from "remix";
import { db } from "~/prisma";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  const allCategories = await db.category.findMany();
  return json(allCategories);
};

export const action: ActionFunction = async (data) => {
  // const category = await db.category.create({
  //   data: {
  //     name: data.request.body?.,
  //   },
  // });
  return json({});
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let categories = useLoaderData<Category[]>();

  return (
    <main className="flex flex-1 p-4 flex-col">
      <h1 className="mb-4 text-center">Welcome to Tasty Recipes!</h1>
      <h3 className="mb-4 text-center">Latest recipes:</h3>
    </main>
  );
}
