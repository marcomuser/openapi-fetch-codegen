import { ExtractedOperations } from "../parser/getOperations.js";
import { printFetchFns } from "./fetchFns/printFetchFns.js";
import { printComment } from "./header/printComment.js";
import { printImports } from "./header/printImports.js";
import { printSharedTypes } from "./header/printSharedTypes.js";

export const printDocument = (
  operations: ExtractedOperations,
  pathToTypes: string
) => `${printComment()}
  
  ${printImports(pathToTypes)}

  ${printSharedTypes()}

  ${printFetchFns(operations)}`;
