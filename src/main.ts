import { transformSpec } from "./transformer/transformSpec.js";
import { printDocument } from "./printer/printDocument.js";
import type { OTSOptions } from "./utils/types.js";

export type Args = {
  pathToSpec: string;
  parseMode: "simple" | "bundle" | "dereference";
};

export default async function main(
  args: Args,
  openAPITSOptions: OTSOptions = {}
) {
  const { operations, typesDoc } = await transformSpec(args, openAPITSOptions);
  const operationsDoc = printDocument(operations);
  return { operationsDoc, typesDoc };
}
