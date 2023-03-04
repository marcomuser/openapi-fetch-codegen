import type { ExtractedOperations } from "../../../parser/extractOperations.js";

export const printFnHeader = (operation: ExtractedOperations[number]) => {
  const { operationId, parameters, requestBody } = operation;

  const parametersTypeRef = parameters
    ? `operations["${operationId}"]["parameters"]`
    : "";

  const requestBodyTypeRef =
    requestBody && requestBody.size
      ? `operations[${operationId}]["requestBody"]["content"]["${getContentType(
          requestBody
        )}"]`
      : "";

  const params = getParams(parametersTypeRef, requestBodyTypeRef);

  return `export const ${operationId} = async(
    ${params}
    config: ExtendedRequestInit
  ) => {`;
};

const getContentType = (
  requestBody: Map<"json" | "multipart" | "urlencoded" | unknown, string>
) => {
  if (requestBody.has("json")) {
    return requestBody.get("json");
  } else if (requestBody.has("multipart")) {
    return requestBody.get("multipart");
  } else if (requestBody.has("urlencoded")) {
    return requestBody.get("urlencoded");
  } else {
    return requestBody.get("unknown");
  }
};

const getParams = (parametersTypeRef: string, requestBodyTypeRef: string) => {
  if (parametersTypeRef && !requestBodyTypeRef) {
    return `params: ${parametersTypeRef},`;
  } else if (!parametersTypeRef && requestBodyTypeRef) {
    return `params: requestBody: ${requestBodyTypeRef},`;
  } else if (parametersTypeRef && requestBodyTypeRef) {
    return `params: ${parametersTypeRef} & requestBody: ${requestBodyTypeRef},`;
  } else {
    return "";
  }
};
