import type { ExtractedOperations } from "../../parser/extractOperations.js";
import { printFnHeader } from "./header/printFnHeader.js";

export const printFetchFns = (operations: ExtractedOperations) => {
  const fetchFns = [];

  for (const operation of operations) {
    const fetchFn = printFetchFn(operation);
    fetchFns.push(fetchFn);
  }

  return fetchFns.join("");
};

const printFetchFn = (operation: ExtractedOperations[number]) =>
  `${printFnHeader(operation)}`;
