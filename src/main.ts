import { transformSpec } from "./transformer/transformSpec.js";
import { printDocument } from "./printer/printDocument.js";

type TInput = {
  pathToSpec: string;
  pathToTypes: string;
};

export default async function main({ pathToSpec, pathToTypes }: TInput) {
  const { operations, types } = await transformSpec(pathToSpec);
  const document = printDocument(operations, pathToTypes);
  return { document, types };
}
