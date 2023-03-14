import type { ExtractedOperation } from "../../../transformer/operations/buildOperations.js";
import { REQ_BODY_CONTENT_TYPE_DICT } from "../../../utils/constants.js";
import { indt, nl } from "../../../utils/formatter.js";

export const printOptions = ({
  method,
  reqContentType,
  parameterTypes,
}: ExtractedOperation) => {
  let optionsProps = `method: "${method}",`;

  optionsProps += getBodyProp(reqContentType);

  optionsProps += getHeadersProp(parameterTypes);

  return `const options: RequestInit = {
${indt(optionsProps)}
};

const clonedConfig = structuredClone(config);
const { baseUrl, ...rest } = clonedConfig;
Object.assign(options, rest);`;
};

const getHeadersProp = (
  parameterTypes: ExtractedOperation["parameterTypes"]
) => {
  if (!parameterTypes.header) {
    return "";
  }

  return `${nl()}headers: new Headers(params.header),`;
};

const getBodyProp = (reqContentType: ExtractedOperation["reqContentType"]) => {
  if (!reqContentType) {
    return "";
  }

  if (isHandledContentType(reqContentType)) {
    return `${nl()}body: ${REQ_BODY_CONTENT_TYPE_DICT[reqContentType]},`;
  }

  return `${nl()}body: params.requestBody,`;
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof REQ_BODY_CONTENT_TYPE_DICT =>
  Object.hasOwn(REQ_BODY_CONTENT_TYPE_DICT, contentType);
