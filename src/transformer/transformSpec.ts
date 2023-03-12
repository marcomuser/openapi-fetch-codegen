import { $RefParser } from "@apidevtools/json-schema-ref-parser";
import openapiTS from "openapi-typescript";
import type { Document } from "../utils/types.js";
import { buildOperations } from "./operations/buildOperations.js";

export const transformSpec = async (pathToSpec: string) => {
  const parser = new $RefParser();
  const dereferencedSpec = (await parser.dereference(pathToSpec)) as Document;
  const types = await openapiTS(dereferencedSpec);
  const operations = buildOperations(dereferencedSpec);
  return { operations, types };
};
