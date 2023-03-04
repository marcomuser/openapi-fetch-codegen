import type { ExtractedOperations } from "../../parser/extractOperations.js";

export const printFetchFns = (operations: ExtractedOperations) => {
  return operations.map((operation, i) => `hello world ${i}`);
};
