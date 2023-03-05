import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { printOptions } from "./printOptions.js";
import { printReturn } from "./printReturn.js";
import { printUrl } from "./printUrl.js";

export const printFnBody = (operation: ExtractedOperation) => {
  return `{
    ${printOptions(operation)}

    ${printUrl(operation)}

    ${printReturn(operation)}
  };`;
};
