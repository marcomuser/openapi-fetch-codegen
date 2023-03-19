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

export const OMITTABLE_REQ_CONTENT_TYPES = {
  "multipart/form-data": true,
  "application/x-www-form-urlencoded": true,
} as const;

export const PREFERRED_REQ_CONTENT_TYPES = [
  "application/json",
  "multipart/form-data",
  "application/x-www-form-urlencoded",
];

export const REQ_BODY_CONTENT_TYPE_DICT = {
  "*/*": "JSON.stringify(params.requestBody)",
  "application/*": "JSON.stringify(params.requestBody)",
  "application/json": "JSON.stringify(params.requestBody)",
  "application/x-www-form-urlencoded": "serializeQuery(params.requestBody)",
  "text/html": "params.requestBody",
  "text/plain": "params.requestBody",
  "text/plain charset=utf-8": "params.requestBody",
  "multipart/form-data": "new FormData(params.requestBody)",
} as const;

export const PREFERRED_RES_CONTENT_TYPES = ["application/json", "text/plain"];

export const RES_CONTENT_TYPE_DICT = {
  "*/*": ".json()",
  "application/*": ".json()",
  "application/json": ".json()",
  "text/plain": ".text()",
  "text/plain charset=utf-8": ".text()",
  "text/html": ".text()",
} as const;
