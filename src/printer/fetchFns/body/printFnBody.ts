import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { printOptions } from "./printOptions.js";

export const printFnBody = (operation: ExtractedOperation) => {
  return `${printOptions(operation)}`;
};
