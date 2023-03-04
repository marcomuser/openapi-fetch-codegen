import type { ExtractedOperations } from "../../../parser/getOperations.js";
import { getParams } from "./getParams.js";

export const printFnHeader = ({
  operationId,
  hasParameters,
  requestBodyContentTypes = [],
}: ExtractedOperations[number]) => {
  const parametersTypeRef = hasParameters
    ? `operations["${operationId}"]["parameters"]`
    : "";

  const requestBodyTypeRef = requestBodyContentTypes.length
    ? `operations[${operationId}]["requestBody"]["content"]["${requestBodyContentTypes[0]}"]`
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
