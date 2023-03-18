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
  if (reqContentType && responsesWithContentType.size) {
    return `new Headers({
  "Accept": "${getAcceptHeaders(responsesWithContentType)}",
  "Content-Type": "${reqContentType}",
})`;
  } else if (reqContentType && !responsesWithContentType.size) {
    return `new Headers({
  "Content-Type": "${reqContentType}",
})`;
  } else if (!reqContentType && responsesWithContentType.size) {
    return `new Headers({
  "Accept": "${getAcceptHeaders(responsesWithContentType)}",
})`;
  } else {
    return "new Headers()";
  }
};

const getAcceptHeaders = (
  responsesWithContentType: TransformedOperation["responsesWithContentType"]
) => {
  const contentTypesSet = new Set<string>();

  for (const contentType of responsesWithContentType.values()) {
    contentTypesSet.add(contentType.trim());
  }

  return [...contentTypesSet].join(", ");
};
