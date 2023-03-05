import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printOptions = ({
  method,
  requestBodyContentTypes,
}: ExtractedOperation) => {
  return `const options: RequestInit = {
    method: "${method}",
    ${getBodyProp(requestBodyContentTypes)}
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

  if (!requestBodyContentTypes.length) {
    return "";
  } else if (Object.hasOwn(contentTypeRequestMap, requestBodyContentTypes[0])) {
    return `body: ${contentTypeRequestMap[requestBodyContentTypes[0]]},`;
  } else {
    return "body: params.requestBody";
  }
};
