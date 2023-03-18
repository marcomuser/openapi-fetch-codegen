import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";

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
  const OMITTABLE_CONTENT_TYPES = {
    "multipart/form-data": true,
    "application/x-www-form-urlencoded": true,
  } as const;

  const hasNonOmittableReqContentType = Boolean(
    reqContentType &&
      !OMITTABLE_CONTENT_TYPES[
        reqContentType as keyof typeof OMITTABLE_CONTENT_TYPES
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
