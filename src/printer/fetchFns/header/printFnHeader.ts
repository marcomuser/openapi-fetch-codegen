import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";

export const printFnHeader = ({
  operationId,
  hasParameters,
  parameterTypes,
  reqContentType,
}: TransformedOperation) => {
  const parametersTypeRef = hasParameters
    ? parameterTypes.cookie
      ? `Omit<operations["${operationId}"]["parameters"], "cookie">`
      : `operations["${operationId}"]["parameters"]`
    : "";

  const reqBodyTypeRef = reqContentType
    ? `{
  [P in keyof Pick<
    operations["${operationId}"],
    "requestBody"
  >]: Exclude<
    operations["${operationId}"]["requestBody"],
    undefined
  >["content"]["${reqContentType}"];
}`
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
    return `params: ${reqBodyTypeRef},`;
  } else if (parametersTypeRef && reqBodyTypeRef) {
    return `params: ${parametersTypeRef} & ${reqBodyTypeRef},`;
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
