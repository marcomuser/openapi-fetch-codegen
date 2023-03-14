import type { ExtractedOperation } from "../../../transformer/operations/buildOperations.js";

export const printFnHeader = ({
  operationId,
  hasParameters,
  reqContentType,
}: ExtractedOperation) => {
  const parametersTypeRef = hasParameters
    ? `Exclude<operations["${operationId}"]["parameters"], "cookie">`
    : "";

  const reqBodyTypeRef = reqContentType
    ? `Exclude<operations["${operationId}"]["requestBody"], undefined>["content"]["${reqContentType}"]`
    : "";

  const params = getParams(parametersTypeRef, reqBodyTypeRef);

  const args = params
    ? `${params}
  config: ExtRequestInit`
    : `config: ExtRequestInit`;

  return `export const ${getSanitizedFnName(operationId as string)} = async (
  ${args}
) => {`;
};

const getParams = (parametersTypeRef: string, reqBodyTypeRef: string) => {
  if (parametersTypeRef && !reqBodyTypeRef) {
    return `params: ${parametersTypeRef},`;
  } else if (!parametersTypeRef && reqBodyTypeRef) {
    return `params: { requestBody: ${reqBodyTypeRef} },`;
  } else if (parametersTypeRef && reqBodyTypeRef) {
    return `params: ${parametersTypeRef} & { requestBody: ${reqBodyTypeRef} },`;
  } else {
    return "";
  }
};

const getSanitizedFnName = (operationId: string) => {
  // Replace non-alphanumeric characters with spaces
  const sanitized = operationId.replaceAll(/\W/g, " ");

  // Convert to camelCase and remove any leading or trailing spaces
  return sanitized
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("")
    .trim();
};
