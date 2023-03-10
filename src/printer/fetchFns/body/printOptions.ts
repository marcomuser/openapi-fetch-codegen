import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { REQ_BODY_CONTENT_TYPE_DICT } from "../../../utils/constants.js";

export const printOptions = ({
  method,
  reqSortedContentType,
}: ExtractedOperation) => {
  const optionsProps = !reqSortedContentType
    ? `method: "${method}"`
    : `method: "${method}",
    ${getBodyProp(reqSortedContentType)}`;

  return `const options: RequestInit = {
    ${optionsProps}
  };

  const clonedConfig = structuredClone(config);
  const { baseUrl, ...rest } = clonedConfig;
  Object.assign(options, rest);`;
};

const getBodyProp = (reqSortedContentType: string) => {
  if (isHandledContentType(reqSortedContentType)) {
    return `body: ${REQ_BODY_CONTENT_TYPE_DICT[reqSortedContentType]},`;
  }

  return "body: params.requestBody";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof REQ_BODY_CONTENT_TYPE_DICT =>
  Object.hasOwn(REQ_BODY_CONTENT_TYPE_DICT, contentType);
