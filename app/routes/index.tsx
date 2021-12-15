import { Category } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "remix";
import { json, Outlet, useLoaderData } from "remix";
import { prisma } from "../../prisma/db";
import { SideBar } from "../components/SideBar";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  const allCategories = await prisma.category.findMany();
  return json(allCategories);
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
  console.log("Index ~ data", categories);

  return (
    <div className="flex flex-1">
      <SideBar categories={categories} />
      <main className="flex flex-1">
        <h1>Welcome to Tasty Recipes!</h1>
      </main>
      <Outlet />
    </div>
  );
}
