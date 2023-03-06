import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { REQUEST_BODY_TYPE } from "../../../utils/consts.js";

export const printOptions = ({
  method,
  requestBodyContentTypes,
}: ExtractedOperation) => {
  const optionsProps = !requestBodyContentTypes.length
    ? `method: "${method}"`
    : `method: "${method}",
    ${getBodyProp(requestBodyContentTypes)}`;

  return `const options: RequestInit = {
    ${optionsProps}
  };

  const clonedConfig = structuredClone(config);
  const { baseUrl, ...rest } = clonedConfig;
  Object.assign(options, rest);`;
};

const getBodyProp = (requestBodyContentTypes: string[]) => {
  if (isHandledContentType(requestBodyContentTypes[0])) {
    return `body: ${REQUEST_BODY_TYPE[requestBodyContentTypes[0]]},`;
  }

  return "body: params.requestBody";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof REQUEST_BODY_TYPE => {
  return Object.hasOwn(REQUEST_BODY_TYPE, contentType);
};
