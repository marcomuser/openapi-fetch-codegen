import { $RefParser } from "@apidevtools/json-schema-ref-parser";
import openapiTS from "openapi-typescript";
import type { OpenAPIObj, OTSOptions } from "../utils/types.js";
import { buildOperations } from "./operations/buildOperations.js";

export const transformSpec = async (
  pathToSpec: string,
  openAPITSOptions: OTSOptions
) => {
  const parser = new $RefParser();
  const bundledSpec = (await parser.bundle(pathToSpec)) as OpenAPIObj;
  const typesDoc = await openapiTS(bundledSpec, openAPITSOptions);
  const operations = buildOperations(bundledSpec);
  return { operations, typesDoc };
};
