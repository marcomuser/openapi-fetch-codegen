import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printUrl = ({ path }: ExtractedOperation) => {
  return `const searchParams = new URLSearchParams(params.query);
  const url = new URL("/pet/params.path.petId", baseUrl);
  url.search = searchParams.toString();`;
};
