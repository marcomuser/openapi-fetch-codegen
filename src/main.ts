import { transformSpec } from "./transformer/transformSpec.js";
import { printDocument } from "./printer/printDocument.js";
import { OTSOptions } from "./utils/types.js";

export default async function main(
  pathToSpec: string,
  openAPITSOptions: OTSOptions = {}
) {
  const { operations, typesDoc } = await transformSpec(
    pathToSpec,
    openAPITSOptions
  );
  const operationsDoc = printDocument(operations);
  return { operationsDoc, typesDoc };
}
