import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { RES_CONTENT_TYPE_DICT } from "../../../utils/constants.js";

export const printReturn = ({
  operationId,
  resWithSortedContentTypes,
}: ExtractedOperation) => {
  const okResponse = resWithSortedContentTypes["200"];
  return `const response = await fetch(url, options);

  return {
    response,
    data: (${getResType(
      okResponse
    )} as operations[${operationId}]["responses"]["200"]["content"]["application/json"],
  };`;
};

const getResType = (sortedResContentTypes: string[]) => {
  if (isHandledContentType(sortedResContentTypes[0])) {
    return `(await response${RES_CONTENT_TYPE_DICT[sortedResContentTypes[0]]})`;
  }

  return "response.body";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof RES_CONTENT_TYPE_DICT =>
  Object.hasOwn(RES_CONTENT_TYPE_DICT, contentType);
