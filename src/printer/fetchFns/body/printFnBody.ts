import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";
import { printOptions } from "./printOptions.js";
import { printReturn } from "./printReturn.js";
import { printUrl } from "./printUrl.js";

export const printFnBody = (operation: TransformedOperation) =>
  `${printOptions(operation)}
  
${printUrl(operation)}
    
${printReturn(operation)}`;
