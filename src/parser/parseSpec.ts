import SwaggerParser from "@apidevtools/swagger-parser";
import type { Document } from "../types.js";
import { extractOperations } from "./extractOperations.js";

export const parseSpec = async (spec: Document) => {
  const parser = new SwaggerParser();
  const schema = (await parser.dereference(spec)) as Document;
  return extractOperations(schema);
};
