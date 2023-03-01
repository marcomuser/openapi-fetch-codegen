import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPIDocument } from "../types.js";

export const parseSpec = async (spec: OpenAPIDocument) => {
  const parser = new SwaggerParser();
  const schema = await parser.dereference(spec);
  return schema;
};
