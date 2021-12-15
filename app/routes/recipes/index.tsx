import * as React from "react";
import type { LoaderFunction } from "remix";

interface RecipesProps {}

export const loader: LoaderFunction = async () => {};

const Recipes = (props: RecipesProps): JSX.Element => {
  return <div>I'm the new recipe page!</div>;
};

export default Recipes;
