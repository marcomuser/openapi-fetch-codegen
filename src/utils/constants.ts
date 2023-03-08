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

export const PREFERRED_REQ_CONTENT_TYPES = [
  "application/json",
  "multipart/form-data",
  "application/x-www-form-urlencoded",
];

export const REQ_BODY_CONTENT_TYPE_DICT = {
  "application/*": "JSON.stringify(params.requestBody)",
  "application/json": "JSON.stringify(params.requestBody)",
  "application/x-www-form-urlencoded":
    "new URLSearchParams(params.requestBody)",
  "*": "JSON.stringify(params.requestBody)",
  "multipart/form-data": "new FormData(params.requestBody)",
} as const;

export const PREFERRED_RES_CONTENT_TYPES = ["application/json"];

export const RES_CONTENT_TYPE_DICT = {
  "application/json": ".json()",
  "text/html": ".text()",
} as const;
