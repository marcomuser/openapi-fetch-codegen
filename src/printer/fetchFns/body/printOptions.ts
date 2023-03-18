import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";
import { REQ_BODY_CONTENT_TYPE_DICT } from "../../../utils/constants.js";
import { indt, nl } from "../../../utils/format.js";

export const printOptions = ({
  method,
  reqContentType,
  parameterTypes,
}: TransformedOperation) => {
  let optionsProps = `method: "${method}",`;
  optionsProps += getHeadersProp(parameterTypes);
  optionsProps += getBodyProp(reqContentType);

  return `const options: RequestInit = {
${indt(optionsProps)}
};

Object.assign(options, rest);`;
};

const getHeadersProp = (
  parameterTypes: TransformedOperation["parameterTypes"]
) => {
  if (!parameterTypes.header) {
    return `${nl()}headers: serializeHeaders(headers, configHeaders),`;
  }

  return `${nl()}headers: serializeHeaders(headers, configHeaders, params.header),`;
};

const getBodyProp = (
  reqContentType: TransformedOperation["reqContentType"]
) => {
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
