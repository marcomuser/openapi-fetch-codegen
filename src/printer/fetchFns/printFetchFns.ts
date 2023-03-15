import type {
  TransformedOperations,
  TransformedOperation,
} from "../../transformer/operations/buildOperations.js";
import { indt, nl } from "../../utils/format.js";
import { printFnBody } from "./body/printFnBody.js";
import { printFnHeader } from "./header/printFnHeader.js";

export const printFetchFns = (operations: TransformedOperations) => {
  let fetchFns = "";

  for (const operation of operations) {
    fetchFns += printFetchFn(operation);
  }

  return fetchFns;
};

const printFetchFn = (operation: TransformedOperation) =>
  `${printFnHeader(operation)}
${indt(printFnBody(operation))}${nl(1)}};${nl(2)}`;
