import { parseSpec } from "./parser/parseSpec.js";
import { printDocument } from "./printer/printDocument.js";

type TInput = {
  pathToSpec: string;
  pathToTypes: string;
};

export default async function main({ pathToSpec, pathToTypes }: TInput) {
  const { operations, types } = await parseSpec(pathToSpec);
  const document = printDocument(operations, pathToTypes);
  return { document, types };
}
