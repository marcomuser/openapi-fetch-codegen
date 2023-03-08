import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { RESPONSE_TYPE_DICT } from "../../../utils/constants.js";

export const printReturn = ({
  operationId,
  responsesWithSortedContentTypes,
}: ExtractedOperation) => {
  const okResponse = responsesWithSortedContentTypes["200"];
  return `const response = await fetch(url, options);

  return {
    response,
    data: (${getResponseType(
      okResponse
    )} as operations[${operationId}]["responses"]["200"]["content"]["application/json"],
  };`;
};

const getResponseType = (sortedResContentTypes: string[]) => {
  if (isHandledContentType(sortedResContentTypes[0])) {
    return `(await response${RESPONSE_TYPE_DICT[sortedResContentTypes[0]]})`;
  }

  return "response.body";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof RESPONSE_TYPE_DICT =>
  Object.hasOwn(RESPONSE_TYPE_DICT, contentType);
