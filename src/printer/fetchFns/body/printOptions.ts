import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { REQ_BODY_CONTENT_TYPE_DICT } from "../../../utils/constants.js";

export const printOptions = ({
  method,
  sortedReqContentTypes,
}: ExtractedOperation) => {
  const optionsProps = !sortedReqContentTypes.length
    ? `method: "${method}"`
    : `method: "${method}",
    ${getBodyProp(sortedReqContentTypes)}`;

  return `const options: RequestInit = {
    ${optionsProps}
  };

  const clonedConfig = structuredClone(config);
  const { baseUrl, ...rest } = clonedConfig;
  Object.assign(options, rest);`;
};

const getBodyProp = (sortedReqContentTypes: string[]) => {
  if (isHandledContentType(sortedReqContentTypes[0])) {
    return `body: ${REQ_BODY_CONTENT_TYPE_DICT[sortedReqContentTypes[0]]},`;
  }

  return "body: params.requestBody";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof REQ_BODY_CONTENT_TYPE_DICT =>
  Object.hasOwn(REQ_BODY_CONTENT_TYPE_DICT, contentType);
