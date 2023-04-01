import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";

export const printFnHeader = ({
  operationId,
  hasParameters,
  parameterTypes,
  requestBody,
}: TransformedOperation) => {
  const parametersTypeRef = hasParameters
    ? parameterTypes.cookie
      ? `Omit<operations["${operationId}"]["parameters"], "cookie">`
      : `operations["${operationId}"]["parameters"]`
    : "";

  const requestBodyTypeRef = requestBody
    ? `{
  [P in keyof Pick<
    operations["${operationId}"],
    "requestBody"
  >]: Exclude<
    operations["${operationId}"][P],
    undefined
  >["content"]["${requestBody.contentType}"];
}`
    : "";

  const params = getParams(parametersTypeRef, requestBodyTypeRef);

  const args = params
    ? `${params}
  config: ExtRequestInit`
    : `config: ExtRequestInit`;

  return `export const ${getSanitizedFnName(operationId as string)} = async (
  ${args}
) => {`;
};

const getParams = (parametersTypeRef: string, requestBodyTypeRef: string) => {
  if (parametersTypeRef && !requestBodyTypeRef) {
    return `params: ${parametersTypeRef},`;
  } else if (!parametersTypeRef && requestBodyTypeRef) {
    return `params: ${requestBodyTypeRef},`;
  } else if (parametersTypeRef && requestBodyTypeRef) {
    return `params: ${parametersTypeRef} & ${requestBodyTypeRef},`;
  } else {
    return "";
  }
};

const getSanitizedFnName = (operationId: string) => {
  const sanitized = operationId.replaceAll(/\W/g, " ");
  const hasNoWhitespace = /^\S*$/.test(sanitized);

  if (hasNoWhitespace) {
    return sanitized;
  }

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
