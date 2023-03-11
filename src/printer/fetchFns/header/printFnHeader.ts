import type { ExtractedOperation } from "../../../parser/buildOperations.js";

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

  return `export const ${operationId} = async(
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
