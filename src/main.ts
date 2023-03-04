import { parseSpec } from "./parser/parseSpec.js";

type TInput = {
  pathToSpec: string;
  pathToTypes: string;
};

export default async function main({ pathToSpec, pathToTypes }: TInput) {
  const operations = await parseSpec(pathToSpec);
  return operations;
}
