import { fetchSpec } from "./fetcher/fetchSpec.js";
import { parseSpec } from "./parser/parseSpec.js";

type TInput = {
  pathToSpec: string;
  pathToTypes: string;
  pathToOutput: string;
};

export default async function main({
  pathToSpec,
  pathToTypes,
  pathToOutput,
}: TInput) {
  const spec = await fetchSpec(pathToSpec);
  const dereferencedSpec = await parseSpec(spec);
}
