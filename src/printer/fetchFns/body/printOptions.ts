import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { REQUEST_BODY_TYPE_MAP } from "../../../utils/constants.js";

export const printOptions = ({
  method,
  sortedRequestContentTypes,
}: ExtractedOperation) => {
  const optionsProps = !sortedRequestContentTypes.length
    ? `method: "${method}"`
    : `method: "${method}",
    ${getBodyProp(sortedRequestContentTypes)}`;

  return `const options: RequestInit = {
    ${optionsProps}
  };

  const clonedConfig = structuredClone(config);
  const { baseUrl, ...rest } = clonedConfig;
  Object.assign(options, rest);`;
};

const getBodyProp = (sortedRequestContentTypes: string[]) => {
  if (isHandledContentType(sortedRequestContentTypes[0])) {
    return `body: ${REQUEST_BODY_TYPE_MAP[sortedRequestContentTypes[0]]},`;
  }

  return "body: params.requestBody";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof REQUEST_BODY_TYPE_MAP =>
  Object.hasOwn(REQUEST_BODY_TYPE_MAP, contentType);
