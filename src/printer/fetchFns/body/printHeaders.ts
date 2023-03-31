import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";
import { OMITTABLE_REQ_CONTENT_TYPES } from "../../../utils/constants.js";

export const printHeaders = ({
  reqBody,
  responsesWithContentType,
}: TransformedOperation) => {
  return `const clonedConfig = structuredClone(config);
const { baseUrl, headers: configHeaders, ...rest } = clonedConfig;

const headers = ${getHeaders(reqBody, responsesWithContentType)}`;
};

const getHeaders = (
  reqBody: TransformedOperation["reqBody"],
  responsesWithContentType: TransformedOperation["responsesWithContentType"]
) => {
  const hasNonOmittableReqContentType = Boolean(
    reqBody &&
      !OMITTABLE_REQ_CONTENT_TYPES[
        reqBody.contentType as keyof typeof OMITTABLE_REQ_CONTENT_TYPES
      ]
  );

  if (hasNonOmittableReqContentType && responsesWithContentType.size) {
    return `new Headers({
  "Accept": "${getAcceptValue(responsesWithContentType)}",
  "Content-Type": "${reqBody?.contentType}",
})`;
  } else if (hasNonOmittableReqContentType && !responsesWithContentType.size) {
    return `new Headers({
  "Content-Type": "${reqBody?.contentType}",
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
