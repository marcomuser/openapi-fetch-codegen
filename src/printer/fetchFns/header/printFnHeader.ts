import type { ExtractedOperations } from "../../../parser/extractOperations.js";

export const printFnHeader = ({
  operationId,
  parameters,
  requestBody,
}: ExtractedOperations[number]) => {
  const parametersTypeRef = parameters
    ? `operations["${operationId}"]["parameters"]`
    : "";

  const requestBodyTypeRef = requestBody.length
    ? `operations[${operationId}]["requestBody"]["content"]["${requestBody[0]}"]`
    : "";

  const params = getParams(parametersTypeRef, requestBodyTypeRef);

  const args = params
    ? `${params}
    config: ExtendedRequestInit`
    : `config: ExtendedRequestInit`;

  return `export const ${operationId} = async(
    ${args}
  ) => {`;
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
