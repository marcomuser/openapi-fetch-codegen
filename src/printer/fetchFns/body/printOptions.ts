import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { REQ_BODY_CONTENT_TYPE_DICT } from "../../../utils/constants.js";

export const printOptions = ({
  method,
  reqPreferredContentType,
}: ExtractedOperation) => {
  const optionsProps = !reqPreferredContentType
    ? `method: "${method}"`
    : `method: "${method}",
    ${getBodyProp(reqPreferredContentType)}`;

  return `const options: RequestInit = {
    ${optionsProps}
  };

  const clonedConfig = structuredClone(config);
  const { baseUrl, ...rest } = clonedConfig;
  Object.assign(options, rest);`;
};

const getBodyProp = (reqPreferredContentType: string) => {
  if (isHandledContentType(reqPreferredContentType)) {
    return `body: ${REQ_BODY_CONTENT_TYPE_DICT[reqPreferredContentType]},`;
  }

  return "body: params.requestBody";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof REQ_BODY_CONTENT_TYPE_DICT =>
  Object.hasOwn(REQ_BODY_CONTENT_TYPE_DICT, contentType);
