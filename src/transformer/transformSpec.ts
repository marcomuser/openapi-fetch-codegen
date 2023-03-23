import { $RefParser } from "@apidevtools/json-schema-ref-parser";
import openapiTS from "openapi-typescript";
import type { OApiFetchArgs } from "../main.js";
import type {
  OpenAPIObj,
  OApiTsOptions,
  RefParserOptions,
} from "../utils/types.js";
import { buildOperations } from "./operations/buildOperations.js";

export const transformSpec = async (
  args: OApiFetchArgs,
  openAPITSOptions: OApiTsOptions,
  refParserOptions: RefParserOptions
) => {
  const spec = await parse(args, refParserOptions);
  const typesDoc = await openapiTS(spec, openAPITSOptions);
  const operations = buildOperations(spec as OpenAPIObj);
  return { operations, typesDoc };
};

const parse = async (
  args: OApiFetchArgs,
  refParserOptions: RefParserOptions
) => {
  const { parseMode, pathToSpec } = args;
  const parser = new $RefParser();

  switch (parseMode) {
    case "bundle":
      return await parser.bundle(pathToSpec, refParserOptions);
    case "dereference":
      return await parser.dereference(pathToSpec, refParserOptions);

    default:
      return await parser.parse(pathToSpec, refParserOptions);
  }
};
