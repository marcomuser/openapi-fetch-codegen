import { $RefParser } from "@apidevtools/json-schema-ref-parser";
import openapiTS from "openapi-typescript";
import type { Document, OTSOptions } from "../utils/types.js";
import { buildOperations } from "./operations/buildOperations.js";

export const transformSpec = async (
  pathToSpec: string,
  openAPITSOptions: OTSOptions
) => {
  const parser = new $RefParser();
  const dereferencedSpec = (await parser.dereference(pathToSpec)) as Document;
  const typesDoc = await openapiTS(dereferencedSpec, openAPITSOptions);
  const operations = buildOperations(dereferencedSpec);
  return { operations, typesDoc };
};
