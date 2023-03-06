export const HTTP_VERBS = {
  get: true,
  head: true,
  post: true,
  put: true,
  delete: true,
  options: true,
  trace: true,
  patch: true,
} as const;

export const PREFERRED_CONTENT_TYPES = [
  "application/json",
  "multipart/form-data",
  "application/x-www-form-urlencoded",
];

export const REQUEST_BODY_TYPE = {
  "application/*": "JSON.stringify(params.requestBody)",
  "application/json": "JSON.stringify(params.requestBody)",
  "application/x-www-form-urlencoded":
    "new URLSearchParams(params.requestBody)",
  "*": "JSON.stringify(params.requestBody)",
  "multipart/form-data": "new FormData(params.requestBody)",
} as const;
