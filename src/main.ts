import { transformSpec } from "./transformer/transformSpec.js";
import { printDocument } from "./printer/printDocument.js";
import type { OApiTsOptions, RefParserOptions } from "./utils/types.js";

export type OApiFetchArgs = {
  pathToSpec: string;
  parseMode: "simple" | "bundle" | "dereference";
};

export default async function main(
  args: OApiFetchArgs,
  openAPITSOptions: OApiTsOptions = {},
  refParserOptions: RefParserOptions = {}
) {
  const { operations, typesDoc } = await transformSpec(
    args,
    openAPITSOptions,
    refParserOptions
  );
  const operationsDoc = printDocument(operations);
  return { operationsDoc, typesDoc };
}
