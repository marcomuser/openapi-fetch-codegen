import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printOptions = ({
  method,
  requestBodyContentTypes,
}: ExtractedOperation) => {
  const optionsProps = !requestBodyContentTypes.length
    ? `method: "${method}"`
    : `method: "${method}",
    ${getBodyProp(requestBodyContentTypes)}`;

  return `const options: RequestInit = {
    ${optionsProps}
  };

  const clonedConfig = structuredClone(config);
  const { baseUrl, ...rest } = clonedConfig;
  Object.assign(options, rest);
  `;
};

const getBodyProp = (requestBodyContentTypes: string[]) => {
  const contentTypeRequestMap: Record<string, string> = {
    "application/*": "JSON.stringify(params.requestBody)",
    "application/json": "JSON.stringify(params.requestBody)",
    "application/x-www-form-urlencoded":
      "new URLSearchParams(params.requestBody)",
    "*": "JSON.stringify(params.requestBody)",
    "multipart/form-data": "new FormData(params.requestBody)",
  };

  if (Object.hasOwn(contentTypeRequestMap, requestBodyContentTypes[0])) {
    return `body: ${contentTypeRequestMap[requestBodyContentTypes[0]]},`;
  }

  return "body: params.requestBody";
};
