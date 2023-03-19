import { $RefParser } from "@apidevtools/json-schema-ref-parser";
import openapiTS from "openapi-typescript";
import type { OFCArgs } from "../main.js";
import type { OpenAPIObj, OTSOptions } from "../utils/types.js";
import { buildOperations } from "./operations/buildOperations.js";

export const transformSpec = async (
  args: OFCArgs,
  openAPITSOptions: OTSOptions
) => {
  const spec = await parse(args);
  const typesDoc = await openapiTS(spec, openAPITSOptions);
  const operations = buildOperations(spec as OpenAPIObj);
  return { operations, typesDoc };
};

const parse = async ({ pathToSpec, parseMode }: OFCArgs) => {
  const parser = new $RefParser();

  switch (parseMode) {
    case "bundle":
      return await parser.bundle(pathToSpec);
    case "dereference":
      return await parser.dereference(pathToSpec);

    default:
      return await parser.parse(pathToSpec);
  }
};
