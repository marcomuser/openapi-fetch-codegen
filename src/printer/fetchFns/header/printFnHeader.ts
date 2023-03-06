import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printFnHeader = ({
  operationId,
  hasParameters,
  requestBodyContentTypes = [],
}: ExtractedOperation) => {
  const parametersTypeRef = hasParameters
    ? `operations["${operationId}"]["parameters"]`
    : "";

  const requestBodyTypeRef = requestBodyContentTypes.length
    ? `operations[${operationId}]["requestBody"]["content"]["${requestBodyContentTypes[0]}"]`
    : "";

  const params = getParams(parametersTypeRef, requestBodyTypeRef);

  const args = params
    ? `${params}
    config: ExtRequestInit`
    : `config: ExtRequestInit`;

  return `export const ${operationId} = async(
    ${args}
  ) =>`;
};

const getParams = (parametersTypeRef: string, requestBodyTypeRef: string) => {
  if (parametersTypeRef && !requestBodyTypeRef) {
    return `params: ${parametersTypeRef},`;
  } else if (!parametersTypeRef && requestBodyTypeRef) {
    return `params: { requestBody: ${requestBodyTypeRef} },`;
  } else if (parametersTypeRef && requestBodyTypeRef) {
    return `params: ${parametersTypeRef} & { requestBody: ${requestBodyTypeRef} },`;
  } else {
    return "";
  }
};
