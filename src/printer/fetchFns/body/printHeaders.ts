import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";
import { OMITTABLE_REQ_CONTENT_TYPES } from "../../../utils/constants.js";

export const printHeaders = ({
  requestBody,
  responsesWithContentType,
}: TransformedOperation) => {
  return `const clonedConfig = structuredClone(config);
const { baseUrl, headers: configHeaders, ...rest } = clonedConfig;

const headers = ${getHeaders(requestBody, responsesWithContentType)}`;
};

const getHeaders = (
  requestBody: TransformedOperation["requestBody"],
  responsesWithContentType: TransformedOperation["responsesWithContentType"]
) => {
  const hasNonOmittableReqContentType = Boolean(
    requestBody &&
      !OMITTABLE_REQ_CONTENT_TYPES[
        requestBody.contentType as keyof typeof OMITTABLE_REQ_CONTENT_TYPES
      ]
  );

  if (hasNonOmittableReqContentType && responsesWithContentType.size) {
    return `new Headers({
  "Accept": "${getAcceptValue(responsesWithContentType)}",
  "Content-Type": "${requestBody?.contentType}",
})`;
  } else if (hasNonOmittableReqContentType && !responsesWithContentType.size) {
    return `new Headers({
  "Content-Type": "${requestBody?.contentType}",
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
