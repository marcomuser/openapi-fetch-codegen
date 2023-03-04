import type { RequestBody } from "../types.js";

export const extractRequestBody = (requestBody: RequestBody) => {
  const contentTypes = new Map<
    "json" | "multipart" | "urlencoded" | "unknown",
    string
  >();

  for (const contentType in requestBody.content) {
    if (contentType.includes("json")) {
      contentTypes.set("json", contentType);
    } else if (contentType.includes("multipart/form-data")) {
      contentTypes.set("multipart", contentType);
    } else if (contentType.includes("x-www-form-urlencoded")) {
      contentTypes.set("urlencoded", contentType);
    } else [contentTypes.set("unknown", contentType)];
  }

  return contentTypes;
};
