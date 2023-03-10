import type {
  ExtractedOperations,
  ExtractedOperation,
} from "../../parser/getOperations.js";
import { printFnBody } from "./body/printFnBody.js";
import { printFnHeader } from "./header/printFnHeader.js";

export const printFetchFns = (operations: ExtractedOperations) => {
  const fetchFns = [];

  for (const operation of operations) {
    const fetchFn = printFetchFn(operation);
    fetchFns.push(fetchFn);
  }

  return fetchFns.join("");
};

const printFetchFn = (operation: ExtractedOperation) =>
  `${printFnHeader(operation)}
  ${printFnBody(operation)}
  
  `;
