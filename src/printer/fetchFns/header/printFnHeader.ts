import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printFnHeader = ({
  operationId,
  hasParameters,
  reqPreferredContentType,
}: ExtractedOperation) => {
  const parametersTypeRef = hasParameters
    ? `operations["${operationId}"]["parameters"]`
    : "";

  const reqBodyTypeRef = reqPreferredContentType
    ? `Exclude<operations["${operationId}"]["requestBody"], undefined>["content"]["${reqPreferredContentType}"]`
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
