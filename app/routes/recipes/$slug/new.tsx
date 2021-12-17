import * as React from "react";
import { ActionFunction, Form, redirect, useParams } from "remix";
import slugify from "slugify";
import { db } from "~/prisma";
import { Button, Input, TextArea } from "../../../components";

interface NewRecipeProps {}

export const action: ActionFunction = async ({ request, params }) => {
  const body = new URLSearchParams(await request.text());
  await db.recipe.create({
    data: {
      title: body.get("title") as string,
      slug: slugify(body.get("title") as string).toLowerCase(),
      body: body.get("body") as string,
      category: {
        connect: {
          slug: params.slug,
        },
      },
    },
  });
  return redirect(`/recipes/${params.slug}`);
};

const NewRecipe = (props: NewRecipeProps): JSX.Element => {
  const params = useParams();
  console.log("params", params);
  return (
    <div className="flex flex-col px-4 w-full">
      <h3 className="font-bold mb-4">New Recipe</h3>
      <div className="flex flex-col w-full">
        <Form method="post">
          <input type="hidden" value={params?.slug} name="slug" />
          <Input
            label="Title"
            name="title"
            placeholder="Title"
            aria-label="Recipe Tile"
          />
          <TextArea
            className="mt-4 w-full"
            label="Body"
            name="body"
            placeholder="Body"
            aria-label="Recipe Body"
          />
          <Button type="submit" className="mt-4 ml-auto">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewRecipe;
