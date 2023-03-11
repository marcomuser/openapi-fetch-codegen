import { $RefParser } from "@apidevtools/json-schema-ref-parser";
import type { Document } from "../utils/types.js";
import { buildOperations } from "./buildOperations.js";

export const parseSpec = async (pathToSpec: string) => {
  const parser = new $RefParser();
  const dereferencedSpec = (await parser.dereference(pathToSpec)) as Document;
  return buildOperations(dereferencedSpec);
};
