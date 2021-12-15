import React from "react";
import { Form } from "remix";

interface CreateFormProps {}

export const CreateForm = (props: CreateFormProps): JSX.Element => {
  return <Form method="post"></Form>;
};
