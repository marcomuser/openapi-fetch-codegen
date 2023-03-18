import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";
import { OMITTABLE_REQ_CONTENT_TYPES } from "../../../utils/constants.js";

export const printHeaders = ({
  reqContentType,
  responsesWithContentType,
}: TransformedOperation) => {
  return `const clonedConfig = structuredClone(config);
const { baseUrl, headers: configHeaders, ...rest } = clonedConfig;

const headers = ${getHeaders(reqContentType, responsesWithContentType)}`;
};

const getHeaders = (
  reqContentType: TransformedOperation["reqContentType"],
  responsesWithContentType: TransformedOperation["responsesWithContentType"]
) => {
  const hasNonOmittableReqContentType = Boolean(
    reqContentType &&
      !OMITTABLE_REQ_CONTENT_TYPES[
        reqContentType as keyof typeof OMITTABLE_REQ_CONTENT_TYPES
      ]
  );

  if (hasNonOmittableReqContentType && responsesWithContentType.size) {
    return `new Headers({
  "Accept": "${getAcceptValue(responsesWithContentType)}",
  "Content-Type": "${reqContentType}",
})`;
  } else if (hasNonOmittableReqContentType && !responsesWithContentType.size) {
    return `new Headers({
  "Content-Type": "${reqContentType}",
})`;
  } else if (!hasNonOmittableReqContentType && responsesWithContentType.size) {
    return `new Headers({
  "Accept": "${getAcceptValue(responsesWithContentType)}",
})`;
  } else {
    return "new Headers()";
  }
};

const getAcceptValue = (
  responsesWithContentType: TransformedOperation["responsesWithContentType"]
) => {
  const contentTypesSet = new Set<string>();

  for (const contentType of responsesWithContentType.values()) {
    contentTypesSet.add(contentType.trim());
  }

  return [...contentTypesSet].join(", ");
};
