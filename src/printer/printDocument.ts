import type { TransformedOperations } from "../transformer/operations/buildOperations.js";
import { printFetchFns } from "./fetchFns/printFetchFns.js";
import { printComment } from "./header/printComment.js";
import { printImports } from "./header/printImports.js";
import { printSerializer } from "./header/printSerializer.js";
import { printSharedTypes } from "./header/printSharedTypes.js";

export const printDocument = (
  operations: TransformedOperations
) => `${printComment()}
  
${printImports()}

${printSharedTypes()}

${printSerializer()}

${printFetchFns(operations)}`;
