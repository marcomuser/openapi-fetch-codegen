import { ExtractedOperations } from "../parser/extractOperations.js";
import { printFetchFns } from "./fetchFns/printFetchFns.js";
import { printComment } from "./header/printComment.js";
import { printImports } from "./header/printImports.js";
import { printSharedTypes } from "./header/printSharedTypes.js";

export const printDocument = (
  operations: ExtractedOperations,
  pathToTypes: string
) => {
  return `${printComment()}
  
  ${printImports(pathToTypes)}

  ${printSharedTypes()}

  ${printFetchFns(operations)}
`;
};
