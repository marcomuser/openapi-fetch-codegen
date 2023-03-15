import type {
  ExtractedOperations,
  ExtractedOperation,
} from "../../transformer/operations/buildOperations.js";
import { indt, nl } from "../../utils/format.js";
import { printFnBody } from "./body/printFnBody.js";
import { printFnHeader } from "./header/printFnHeader.js";

export const printFetchFns = (operations: ExtractedOperations) => {
  let fetchFns = "";

  for (const operation of operations) {
    fetchFns += printFetchFn(operation);
  }

  return fetchFns;
};

const printFetchFn = (operation: ExtractedOperation) =>
  `${printFnHeader(operation)}
${indt(printFnBody(operation))}${nl(1)}};${nl(2)}`;
