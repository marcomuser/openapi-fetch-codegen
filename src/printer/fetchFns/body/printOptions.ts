import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printOptions = ({ method }: ExtractedOperation) => {
  return `const options: RequestInit = {
    method: "${method}",
    body: JSON.stringify(params.requestBody),
  };

  const clonedConfig = structuredClone(config);
  const { baseUrl, ...rest } = clonedConfig;
  Object.assign(options, rest);
  `;
};
