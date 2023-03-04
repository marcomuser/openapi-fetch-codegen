import SwaggerParser from "@apidevtools/swagger-parser";
import type { Document } from "../types.js";
import { getOperations } from "./getOperations.js";

export const parseSpec = async (pathToSpec: string) => {
  const parser = new SwaggerParser();
  const dereferencedSpec = (await parser.dereference(pathToSpec)) as Document;
  return getOperations(dereferencedSpec);
};
